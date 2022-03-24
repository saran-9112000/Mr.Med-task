const express = require('express');
const router  = express.Router();

const couponController = require('../controllers/coupon.controller.js');

// Create a new Coupon
router.post('/mrMed/coupons', couponController.create);

// Retrieve all Banners
router.get('/mrMed/coupons', couponController.findAll);

// Retrieve a single Banner with bannerId
router.get('/mrMed/coupons/:couponId', couponController.findOne);

// Update a Banner with bannerId
router.put('/mrMed/coupons/:couponId', couponController.update);

// Delete a Banner with bannerId
router.delete('/mrMed/coupons/:couponId', couponController.delete);
   
module.exports = router;