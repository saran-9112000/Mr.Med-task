const {medicineValidationSchema}=require('../validators/medicine.validator');
const Medicine = require('../models/medicine.model.js');


const excel = require("exceljs");
const readXlsxFile = require("read-excel-file/node");
// Create and Save a new Medicine
exports.create = async(req, res) => {
// Validate request
try{
const result = await medicineValidationSchema.validateAsync(req.body);
Medicine.findById(req.params.medicineId, (err, data) => {
    //if Medeicine not in db, add it
    if (!data) {

// Create a Medicine
const medicine = new Medicine({
    productName:req.body.productName,
    productCode:req.body.productCode,
    DosageForm:req.body.DosageForm,
    PackingForm:req.body.PackingForm,
    PackingDisplay:req.body.PackingDisplay,
    PackingSize:req.body.PackingSize,
    Weight:req.body.Weight,
    Care:req.body.Care,
    Salt:req.body.Salt,
    SaltGroup:req.body.SaltGroup,
    Speciality:req.body.Speciality,
    Manufacturer:req.body.Manufacturer,
    mrp:req.body.mrp,
    PriceToCustomer:req.body.PriceToCustomer,
    DiscountPercentFromMRP:req.body.DiscountPercentFromMRP,
    TaxPercentage:req.body.TaxPercentage,
    Condition:req.body.Condition,
    HomepageCategory:req.body.HomepageCategory,
    hsn:req.body.hsn,
    CountryOfOrigin:req.body.CountryOfOrigin,
    Strength:req.body.Strength,
    Stock:req.body.Stock,
    prescriptionRequired:req.body.prescriptionRequired,
    pap:req.body.pap,
    papOffer:req.body.papOffer,
    abcd:req.body.abcd,
    UploadImages:req.body.UploadImages,
    Title:req.body.Title,
    Keywords:req.body.Keywords,
    Description:req.body.Description,
});

// Save Medicine details in the database
medicine.save()
.then(data => {
    res.send(data);
}).catch(err => {
    res.status(500).send({
        message: err.message || "Some error occurred while creating the medicine details."
    });
});

}})
} catch(error){
    res.status(200).json({message:error?.message || error})   
}
};

// Retrieve and return all medicine details from the database.
exports.findAll = async(req, res) => {
    Medicine.find({}).sort({status:1,_id:-1})
    .then(medicine => {
        res.send(medicine);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving medicine details."
        });
    });
};

// Find a single Medicine with a medicineId
exports.findOne = (req, res) => {
    Medicine.findById(req.params.medicineId)
    .then(medicine => {
        if(!medicine) {
            return res.status(404).send({
                message: "medicine not found with id " + req.params.medicineId
            });            
        }
        res.send(medicine);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "medicine not found with id " + req.params.medicineId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving medicine with id " + req.params.medicineId
        });
    });
};


// Update medicine identified by the medicineId in the request
exports.update = async(req, res) => {
    // Validate Request
    try{
    result = await medicineValidationSchema.validateAsync(req.body);
    if(!req.body.productName) {
        return res.status(400).send({
            message: "Medicine Name can not be empty"
        });
    }

    // Find medicine details and update it with the request body
    Medicine.findByIdAndUpdate(req.params.medicineId, {
    productName:req.body.productName,
    productCode:req.body.productCode,
    DosageForm:req.body.DosageForm,
    PackingForm:req.body.PackingForm,
    PackingDisplay:req.body.PackingDisplay,
    PackingSize:req.body.PackingSize,
    Weight:req.body.Weight,
    Care:req.body.Care,
    Salt:req.body.Salt,
    SaltGroup:req.body.SaltGroup,
    Speciality:req.body.Speciality,
    Manufacturer:req.body.Manufacturer,
    mrp:req.body.mrp,
    PriceToCustomer:req.body.PriceToCustomer,
    DiscountPercentFromMRP:req.body.DiscountPercentFromMRP,
    TaxPercentage:req.body.TaxPercentage,
    Condition:req.body.Condition,
    HomepageCategory:req.body.HomepageCategory,
    hsn:req.body.hsn,
    CountryOfOrigin:req.body.CountryOfOrigin,
    Strength:req.body.Strength,
    Stock:req.body.Stock,
    prescriptionRequired:req.body.prescriptionRequired,
    pap:req.body.pap,
    papOffer:req.body.papOffer,
    abcd:req.body.abcd,
    UploadImages:req.body.UploadImages,
    Title:req.body.Title,
    Keywords:req.body.Keywords,
    Description:req.body.Description,
    }, {new: true})
    .then(medicine => {
        if(!medicine) {
            return res.status(404).send({
                message: "Medicine not found with id " + req.params.medicineId
            });
        }
        res.send(medicine);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Medicine not found with id " + req.params.medicineId
            });                
        }
        return res.status(500).send({
            message: "Error updating Medicine with id " + req.params.medicineId
        });
    });
    }catch(error){
        res.status(200).json({message:error?.message || error})   
    }
};


// Delete a Medicine with the specified medicineId in the request
exports.delete = (req, res) => {
    Banner.findByIdAndRemove(req.params.medicineId)
    .then(medicine => {
        if(!medicine) {
            return res.status(404).send({
                message: "Medicine not found with id " + req.params.medicineId
            });
        }
        res.send({message: "Medicine deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Medicine not found with id " + req.params.medicineId
            });                
        }
        return res.status(500).send({
            message: "Could not delete medicine with id " + req.params.medicineId
        });
    });
};

exports.download = (req, res) => {
    Medicine.find({}).then((objs) => {
      let tutorials = [];
  
      objs.forEach((obj) => {
        tutorials.push({
    productName:obj.productName,
    productCode:obj.productCode,
    DosageForm:obj.DosageForm,
    PackingForm:obj.PackingForm,
    PackingDisplay:obj.PackingDisplay,
    PackingSize:obj.PackingSize,
    Weight:obj.Weight,
    Care:obj.Care,
    Salt:obj.Salt,
    SaltGroup:obj.SaltGroup,
    Speciality:obj.Speciality,
    Manufacturer:obj.Manufacturer,
    mrp:obj.mrp,
    PriceToCustomer:obj.PriceToCustomer,
    DiscountPercentFromMRP:obj.DiscountPercentFromMRP,
    TaxPercentage:obj.TaxPercentage,
    Condition:obj.Condition,
    HomepageCategory:obj.HomepageCategory,
    hsn:obj.hsn,
    CountryOfOrigin:obj.CountryOfOrigin,
    Strength:obj.Strength,
    Stock:obj.Stock,
    prescriptionRequired:obj.prescriptionRequired,
    pap:obj.pap,
    papOffer:obj.papOffer,
    abcd:obj.abcd,
    UploadImages:obj.UploadImages,
    Title:obj.Title,
    Keywords:obj.Keywords,
    Description:obj.Description,
        });
      });
  
      let workbook = new excel.Workbook();
      let worksheet = workbook.addWorksheet("Tutorials");
      console.log("tutorial",tutorials)
  
      worksheet.columns = [
        { header: "Product Name", key: "productName", width: 25 },
        { header: "Product Code", key: "productCode", width: 25 },
        { header: "Dosage Form", key: "DosageForm", width: 25 },
        { header: "Packing Form", key: "PackingForm", width: 25 },
        { header: "Packing Display", key: "PackingDisplay", width: 25 },
        { header: "Packing Size", key: "PackingSize", width: 25 },
        { header: "Weight", key: "Weight", width: 25 },
        { header: "Care", key: "Care", width: 25 },
        { header: "Salt", key: "Salt", width: 25 },
        { header: "Salt Group", key: "SaltGroup", width: 25 },
        { header: "Speciality", key: "Speciality", width: 25 },
        { header: "Manufacturer", key: "Manufacturer", width: 25 },
        { header: "MRP", key: "mrp", width: 25 },
        { header: "Price To Customer", key: "PriceToCustomer", width: 25 },
        { header: "Discount % from MRP", key: "DiscountPercentFromMRP", width: 25 },
        { header: "Tax Percentage", key: "TaxPercentage", width: 25 },
        { header: "Condition", key: "Condition", width: 25 },
        { header: "Homepage Category", key: "HomepageCategory", width: 25 },
        { header: "HSN", key: "hsn", width: 25 },
        { header: "Country Of Origin", key: "CountryOfOrigin", width: 25 },
        { header: "Strength", key: "Strength", width: 25 },
        { header: "Stock", key: "Stock", width: 25 },
        { header: "Prescription Required", key: "prescriptionRequired", width: 25 },
        { header: "PAP", key: "pap", width: 25 },
        { header: "PAP Offer", key: "papOffer", width: 25 },
        { header: "ABCD", key: "abcd", width: 25 },
        { header: "Upload Images", key: "UploadImages", width: 25 },
        { header: "Title", key: "Title", width: 25 },
        { header: "Keywords", key: "Keywords", width: 25 },
        { header: "Description", key: "Description", width: 25 },
      ];
  
      // Add Array Rows
      worksheet.addRows(tutorials);
  
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename="  + "tutorials.xlsx"
      );
  
      return workbook.xlsx.write(res).then(function () {
        res.status(200).end();
      });
    });
  };

  exports.upload = async (req, res) => {
    try {
      if (req.file == undefined) {
        return res.status(400).send("Please upload an excel file!");
      }
      let path =
        __dirname +"/excel/"+req.file.filename;
      readXlsxFile(path).then((rows) => {
        // skip header
        rows.shift();
        let tutorials = [];
        rows.forEach((row) => {
          let tutorial = {
    productName:row[0],
    productCode:row[1],
    DosageForm:row[2],
    PackingForm:row[3],
    PackingDisplay:row[4],
    PackingSize:row[5],
    Weight:row[6],
    Care:row[7],
    Salt:row[8],
    SaltGroup:row[9],
    Speciality:row[10],
    Manufacturer:row[11],
    mrp:row[12],
    PriceToCustomer:row[13],
    DiscountPercentFromMRP:row[14],
    TaxPercentage:row[15],
    Condition:row[16],
    HomepageCategory:row[17],
    hsn:row[18],
    CountryOfOrigin:row[19],
    Strength:row[20],
    Stock:row[21],
    prescriptionRequired:row[22],
    pap:row[23],
    papOffer:row[24],
    abcd:row[25],
    UploadImages:row[26],
    Title:row[27],
    Keywords:row[28],
    Description:row[29]
          };
          
          tutorials.push(tutorial);
          
        },{new: true});
        
        Medicine.insertMany(tutorials)
          .then(() => {
            res.status(200).send({
              message: "Uploaded the file successfully: " + req.file.originalname,
            });
          })
          .catch((error) => {
            res.status(500).send({
              message: "Fail to import data into database!",
              error: error.message,
            });
          });
      });
      
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Could not upload the file: " + req.file.originalname,
      });
    }
  }; 