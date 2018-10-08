const mongoose = require('mongoose');
var locationSchema =mongoose.Schema({
  address:String,
  coordinates:[Number]
});
var reviewsSchma = mongoose.Schema({
  name:String,
  id:String,
  review:String,
  rating:Number
})
var roomsSchema = mongoose.Schema({
  type:String,
  number:Number,
  description:String,
  photos:[String],
  price:Number
});
var hotelSchema = mongoose.Schema({
  name:{
    type:String,
    required:true,
    // unique:true
  },
  stars:{
    type:Number,
    min:0,
    max:5,
    "default":5
  },
  description:String,
  photos:[String],
  currency:String,
  rooms:[roomsSchema],
  location:locationSchema,
  reviews:[reviewsSchma],
  services:[String]
});
mongoose.model('Hotel',hotelSchema,'hotels')
