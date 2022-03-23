const express = require('express');
const router  = express.Router();

const bannerController = require('../controllers/banner.controller.js');

// Create a new Banner
router.post('/banners', bannerController.create);

// Retrieve all Banners
router.get('/banners', bannerController.findAll);

// Retrieve a single Banner with bannerId
router.get('/banners/:bannerId', bannerController.findOne);

// Update a Banner with bannerId
router.put('/banners/:bannerId', bannerController.update);

// Delete a Banner with bannerId
router.delete('/banners/:bannerId', bannerController.delete);
   
module.exports = router;