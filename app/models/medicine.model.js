const mongoose = require('mongoose');

const MedicineSchema = mongoose.Schema({
    productName:String,
    productCode:String,
    DosageForm:String,
    PackingForm:String,
    PackingDisplay:String,
    PackingSize:Number,
    Weight:Number,
    Care:Boolean,
    Salt:String,
    SaltGroup:String,
    Speciality:String,
    Manufacturer:String,
    mrp:Number,
    PriceToCustomer:Number,
    DiscountPercentFromMRP:Number,
    TaxPercentage:Number,
    Condition:String,
    HomepageCategory:String,
    hsn:String,
    CountryOfOrigin:String,
    Strength:String,
    Stock:Boolean,
    prescriptionRequired:Boolean,
    pap:Boolean,
    papOffer:String,
    abcd:String,
    UploadImages:String,
    Title:String,
    Keywords:String,
    Description:String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Medicine', MedicineSchema);