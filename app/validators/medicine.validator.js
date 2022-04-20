const Joi = require('@hapi/joi')
const boolean = require('@hapi/joi/lib/types/boolean');
const medicineValidationSchema = Joi.object({
    productName:Joi.string().min(5).max(30).required(),
    productCode:Joi.string().min(2).max(30).required(),
    productCode:Joi.string().min(2).max(30).required(),
    DosageForm:Joi.string().min(2).max(30).required(),
    PackingForm:Joi.string().min(2).max(30).required(),
    PackingDisplay:Joi.string().min(1).max(30).required(),
    PackingSize:Joi.number().min(1).max(25).required(),
    Weight:Joi.number().min(1).max(1000).required(),
    Care:Joi.boolean().required(),
    Salt:Joi.number().min(1).max(15).required(),
    SaltGroup:Joi.string().min(2).max(30).required(),
    Speciality:Joi.string().min(2).max(30).required(),
    Manufacturer:Joi.string().min(2).max(30).required(),
    mrp:Joi.number().min(2).required(),
    PriceToCustomer:Joi.number().min(2).required(),
    DiscountPercentFromMRP:Joi.number().min(1).max(100).required(),
    TaxPercentage:Joi.number().min(1).max(100).required(),
    Condition:Joi.string().min(1).max(100).required(),
    HomepageCategory:Joi.string().min(2).max(30).required(),
    hsn:Joi.string().min(2).max(30).required(),
    CountryOfOrigin:Joi.string().min(2).max(30).required(),
    Strength:Joi.string().min(2).max(30).required(),
    Stock:Joi.boolean().required(),
    prescriptionRequired:Joi.boolean().required(),
    pap:Joi.boolean().required(),
    papOffer:Joi.string().min(2).max(30).required(),
    abcd:Joi.string().min(2).max(30).required(),
    UploadImages:Joi.string().min(2).max(30).required(),
    Title:Joi.string().min(2).max(30).required(),
    Keywords:Joi.string().min(2).max(30).required(),
    Description:Joi.string().min(2).max(100).required(),

})

module.exports={
    medicineValidationSchema
}