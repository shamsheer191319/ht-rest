const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var blogSchema= new Schema({
  title:String,
  author:String,
  details:[{head:String,body:String,imagepath:String}],
  date:Date,
  reviews:String,
  ratings:Number
});
var Blog=  mongoose.model('Blog',blogSchema,'hotels');
