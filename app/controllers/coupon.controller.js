const Coupon = require('../models/coupon.model.js');

// Create and Save a new Coupon
exports.create = (req, res) => {
// Validate request
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
    Status:req.body.Status
});

// Save Coupon in the database
coupon.save()
.then(data => {
    res.send(data);
}).catch(err => {
    res.status(500).send({
        message: err.message || "Some error occurred while creating the Coupon."
    });
});

}})
};

// Retrieve and return all Coupon from the database.
exports.findAll = (req, res) => {
    Coupon.find({}).sort({_id:-1})
    .then(coupon => {
        res.send(coupon);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving coupon details."
        });
    });
};

// Find a single Coupon with a couponId
exports.findOne = (req, res) => {
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


// Update a coupon identified by the couponId in the request
exports.update = (req, res) => {
    // Validate Request
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
};


// Delete a Coupon with the specified couponId in the request
exports.delete = (req, res) => {
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