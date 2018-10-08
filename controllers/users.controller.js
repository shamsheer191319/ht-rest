module.exports.getUser = function(req,res){
  var user = {
    name: "John Smith",
    age:29
  }
  res
  .status(200)
  .json(user)
}
module.exports.getUsers = function(req,res){
  var users =[ { name: "John Smith", age:29 },
  { name: "Rogn Smith", age:20 },
  { name: "Wikky Smith", age:21 }];
  res
  .status(200)
  .json(users)
}
module.exports.addUser =(req,res)=>{
  res
  .status(200)
  .json({message:'This is a post request'});
}
module.exports.updateUser =(req,res)=>{
  res
  .status(200)
  .json({message:'This is a put request'});
}
