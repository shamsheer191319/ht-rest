const mongoose = require('mongoose');
var User =mongoose.model('User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CONFIG = require('../config');
const log4js = require('log4js');
log4js.configure('./config/log4js.json')
var userlog = log4js.getLogger('user');
var accesslog = log4js.getLogger('access');
var errorlog = log4js.getLogger('error');

module.exports.registration=(req,res,next)=>{
  accesslog.info("Registration Hit /register");
  if(!req.body||!req.body.name || !req.body.email || !req.body.password || !req.body.phone ){
    res.status(404).json({
      message:"Failed to Register a User,Required Fields are Missing",
    });
    errorlog.error("Failed to Register a User,Required Fields are Missing")
  }else{
    const saltRounds = 10;
    var salt = bcrypt.genSaltSync(saltRounds);
    var hashPassword = bcrypt.hashSync(req.body.password,salt);
    var newUser = new User({
      name:req.body.name,
      email:req.body.email,
      password:hashPassword,
      role:req.body.role,
      phoneNumber:req.body.phone
    });
    newUser.save(function (err,user){
      if(err){
        res.status(500).json({
          payLoad:{error:err,messsage:"Failed to Register a User"}
        });
        errorlog.error({error:err,messsage:"Failed to Register a User"})
      }else{
        // jwt.sign(payload,signature)
        var token = jwt.sign({_id:user._id},CONFIG.SECREATKEY,{expiresIn:43200})
        res.status(200).json(
          {
            payLoad:{
            message:"Registration SuccessFull !",
            auth:true,
            token:token
          }
        });
        userlog.info("User is Register with Token :"+token)
      }
    })
  }
 
}
module.exports.login=(req,res,next)=>{
  if(!req.body.email || !req.body.password){
    res.status(400).json({
      payLoad:{
      message:"Email and Password Cannot be Empty",
      auth:false
    }});
  }else{
    User.findOne({email:req.body.email},function(err,user){
      if(err){
        res.status(500).json({
          payLoad:{
          message:"Internal Server Error",
          auth:false
        }});
      }else{
        if(!user){
          res.status(404).json({
            payLoad:{
            message:"User Do Not Exist Get Register",
            auth:false
          }});
        }else{
          var isPwd = bcrypt.compareSync(req.body.password,user.password);
          console.log("isPwd:     : ",isPwd);
          if(!isPwd){
            res.status(500).json({
              payLoad:{
              message:"Password Not Match ",
              auth:false
            }});
          }else{
            var token = jwt.sign({_id:user._id},CONFIG.SECREATKEY,{expiresIn:43200})
            res.status(200).json({
              payLoad:{
              message:"Login SuccessFull !!!",
              auth:true,
              token:token
            }});
          }
        }
      }
    });
  }
}
module.exports.validateToken=(req,res,next)=>{
  var token = req.headers['x-access-token'];
  if(!token){
    res.status(404).json({
      payLoad:{
        auth:false,
        message:"Token Not Found !",
        token:null
      }
    })
  }else {
    jwt.verify(token,CONFIG.SECREATKEY,function(error,doc){
      if(error){
        res.status(401).json({
          auth:false,
          message:"Failed to authenticate Token :: Invalid Token {Unautherized}",
          token:null
        });
      }else{
        console.log(doc);
        User.findById(doc._id,function(err,user){
          if(err){
            res.status(500).json({
              auth:false,
              message:"Internal server Error",
              token:null
            });
          }if(!user){
            res.status(404).json({
              auth:false,
              message:"Not A valid User For Platform Incendent will be Reported",
              token:null
            });
          }else{
            // res.status(200).send(user)
            next();
          }
        })
      }
    })
  }
}
