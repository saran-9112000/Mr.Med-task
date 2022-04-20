const express = require('express');
const router  = express.Router();

const medicineController = require('../controllers/medicine.controller.js');
const upload = require("../controllers/multer.js");

// Create a new Banner
router.post('/mrMed/medicines',medicineController.create);

// Retrieve all Banners
router.get('/mrMed/medicines', medicineController.findAll);

// Retrieve a single Banner with bannerId
router.get('/mrMed/medicines/:medicineId', medicineController.findOne);

// Update a Banner with bannerId
router.put('/mrMed/medicines/:medicineId', medicineController.update);

// Delete a Banner with bannerId
router.delete('/mrMed/medicines/:medicineId', medicineController.delete);

router.get('/mrMed/medicines/api/excel/download',medicineController.download)

router.post('/mrMed/medicines/api/excel/upload',upload.single("file"),medicineController.upload)
   
module.exports = router;