const mongoose = require('mongoose');
const userSchema=mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:String,
  role:String,
  phoneNumber:Number,
  gender:{
    type:String,
    "default":"Male"
    },
    regDate:{type:Date,"default":Date.now},
    lastLoginDate:{type:Date,"default":Date.now},
    isActive:{type:Boolean,"default":false}
});
mongoose.model('User',userSchema,'hotel.usr')
