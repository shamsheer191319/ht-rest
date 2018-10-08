var express = require('express');
var router = express.Router();
const hotelCtrl = require('../controllers/hotels.controller');
const authCtrl = require('../controllers/auth.controller');

router
.route('/hotels')
.get(authCtrl.validateToken,hotelCtrl.getHotelsData);
router
.route('/hotels/new')
.post(authCtrl.validateToken,hotelCtrl.addHotelNew);

router
.route('/hotels/:hotelId')
.get(authCtrl.validateToken,hotelCtrl.getHotelData);

router
.route('/hotels/:hotelId/reviews')
.get(hotelCtrl.getHotelReviews)
.put(hotelCtrl.addHotelReview);

router
.route('/hotels/:hotelId/reviews/:reviewId')
.get(hotelCtrl.getHotelOneReview);

module.exports=router;
