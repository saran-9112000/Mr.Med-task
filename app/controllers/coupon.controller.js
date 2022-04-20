
const {AuthSchema}=require('../validators/coupon.validator');
const axios = require('axios');
require('dotenv').config();
const Coupon = require('../models/coupon.model')
const sendMail = require('../mailer/coupon.mailer')
const jwt = require('jsonwebtoken')



// Create and Save a new Coupon
exports.create = async(req, res) => {
// Validate request
try{
const result = await AuthSchema.validateAsync(req.body);
const mail = await sendMail(req.body);
Coupon.findById(req.params.couponId, (err, data) => {
    //if Coupon not in db, add it
    if (!data) {
// Create a coupon
const coupon = new Coupon({
    OfferName:req.body.OfferName,
    CouponCode:req.body.CouponCode,
    StartDate:req.body.StartDate,
    EndDate:req.body.EndDate,
    DiscountPercentage:req.body.DiscountPercentage,
    DiscountAmount:req.body.DiscountAmount,
    TermsAndCondition:req.body.TermsAndCondition,
    OfferPosterOrImage:req.body.OfferPosterOrImage,
    Status:req.body.Status,
});
// Save Coupon in the database
coupon.save()
.then(data => {
    if(coupon.StartDate<new Date() && coupon.EndDate>new Date())
    {
        
        return res.send(data);
    }

    else return res.status(500).send({message: "Coupon Expired" });
}).catch(err => {
    res.status(500).send({
        message:  "Some error occurred while creating the Coupon."   
    });
    
});
}})
}
catch (error){
    res.status(200).json({message:error?.message || error})   
}
};


exports.userCoupon = async(req, res) => {
    // Validate request
    try{
    const result = await AuthSchema.validateAsync(req.body);
    const mail = await sendMail(req.body);
  
    Coupon.findById(req.params.couponId, (err, data) => {
        //if Coupon not in db, add it
        if (!data) {
    // Create a coupon
    const coupon = new Coupon({
        OfferName:req.body.OfferName,
        CouponCode:req.body.CouponCode,
        StartDate:req.body.StartDate,
        EndDate:req.body.EndDate,
        DiscountPercentage:req.body.DiscountPercentage,
        DiscountAmount:req.body.DiscountAmount,
        TermsAndCondition:req.body.TermsAndCondition,
        OfferPosterOrImage:req.body.OfferPosterOrImage,
        Status:req.body.Status,
    });
    
    
    // Save Coupon in the database
    coupon.save()
    .then(data => {
        if(coupon.StartDate<new Date() && coupon.EndDate>new Date())
        {
            
            return res.send(data);
        }
    
        else return res.status(500).send({message: "Coupon Expired" });
    }).catch(err => {
        res.status(500).send({
            message:  "Some error occurred while creating the Coupon."   
        });
        
    });
    }})
    }
    catch (error){
        res.status(200).json({message:error?.message || error})   
    }
};

exports.createWithUserId = async(req, res) => {
    try{
    
    Coupon.findById(req.body.OfferName, (err, data) => {
      
    
        if (!data) {
            axios.post("http://localhost:3001/auth/register", {
            email: req.body.email,
            password: req.body.password,
            fullName: req.body.fullName
            }).then(function(response) {
            console.log(response.data)
            var decoded=jwt.decode(response.data);
            var userId=decoded._id;
            console.log(decoded._id);
            
            var currentStatus;
            var currentDate=new Date().getTime()
            var dateOne = new Date(req.body.EndDate).getTime();
            
           
        const coupon = new Coupon({
        OfferName:req.body.OfferName,
        CouponCode:req.body.CouponCode,
        StartDate:req.body.StartDate,
        EndDate:req.body.EndDate,
        DiscountPercentage:req.body.DiscountPercentage,
        DiscountAmount:req.body.DiscountAmount,
        TermsAndCondition:req.body.TermsAndCondition,
        OfferPosterOrImage:req.body.OfferPosterOrImage,
        Status:req.body.Status,
        userId:userId
    });
    coupon.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Coupon."
        });
    });
}) 
    }})
    }catch(error) {
        res.status(409).json({ message: error?.message || error })
        console.log(error);
    }
};

// Retrieve and return all Coupon from the database.
exports.findAll = async(req, res) => {
    
    Coupon.find({}).sort({_id:-1})
    .then(coupon => {
        res.send(coupon);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving coupon details."
        });
    });        
};
// Retrieve and return all Active Coupon from the database.
exports.findByStatus = (req, res) => {
    
    Coupon.find({Status:req.params.Status,StartDate:req.params.StartDate}).sort({id:-1}).then(coupon => {
            res.send(coupon);
    
}).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving coupon details."
        });
    });
    
};




// Find a single Coupon with a couponId
exports.findOne = async(req, res) => {
    
    Coupon.findById(req.params.couponId)
    .then(coupon => {        
        if(!coupon) {
            return res.status(404).send({
                message: "coupon not found with id " + req.params.couponId
            });            
        }
        res.send(coupon);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "coupon not found with id " + req.params.couponId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving coupon with id " + req.params.couponId
        });
    });
};


exports.CouponWithUser = (req, res) => {
    Coupon.findOne({_id:req.params._id,StartDate:{$lte:new Date()},EndDate: {$gte: new Date()}}).then(coupon => {
                var id=coupon.userId;
                axios.get(`http://localhost:3001/users/${id}`, {
                
             }).then(response=>{
                let user=response.data;
                res.json({
                    coupon,
                    user
                })
                })
             }).catch(err => {
        res.status(500).send({
            message: "out of date"
        });
    });
};


// Update a coupon identified by the couponId in the request
exports.update = async(req, res) => {
    // Validate Request
    try{
        result = await AuthSchema.validateAsync(req.body);
    if(!req.body.OfferName) {
        return res.status(400).send({
            message: "Offer Name can not be empty"
        });
    }
    // Find coupon and update it with the request body
    Coupon.findByIdAndUpdate(req.params.couponId, {
        OfferName:req.body.OfferName,
        CouponCode:req.body.CouponCode,
        StartDate:req.body.StartDate,
        EndDate:req.body.EndDate,
        DiscountPercentage:req.body.DiscountPercentage,
        DiscountAmount:req.body.DiscountAmount,
        TermsAndCondition:req.body.TermsAndCondition,
        OfferPosterOrImage:req.body.OfferPosterOrImage,
        Status:req.body.Status
    }, {new: true})
    .then(coupon => {
        if(!coupon) {
            return res.status(404).send({
                message: "Coupon not found with id " + req.params.couponId
            });
        }
        res.send(coupon);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Coupon not found with id " + req.params.couponId
            });                
        }
        return res.status(500).send({
            message: "Error updating Coupon with id " + req.params.couponId
        });
    });
    }
    catch(error){
        res.status(200).json({message:error?.message || error})
    }   
};
// Delete a Coupon with the specified couponId in the request
exports.delete = async(req, res) => {
    
    Coupon.findByIdAndRemove(req.params.couponId)
    .then(coupon => {
        if(!coupon) {
            return res.status(404).send({
                message: "Coupon not found with id " + req.params.couponId
            });
        }
        res.send({message: "Coupon deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Coupon not found with id " + req.params.couponId
            });                
        }
        return res.status(500).send({
            message: "Could not delete coupon with id " + req.params.couponId
        });
    });
};

exports.createTo=async(req,res)=> {
    try {
        let response = await axios({
            method: "GET",
            url: process.env.GET_ID,
            headers: {
                contentType: "application/json",
            }
        })
        return res.status(200).send({ 
            response:response.data
        })
    } 
    catch(error){
        res.status(400).json({
            message:error
        })
        console.log(error)
    }
  }