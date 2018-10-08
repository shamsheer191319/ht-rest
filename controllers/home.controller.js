module.exports.home = function(req,res){
  var id = req.params.id;
  res
  .status(200)
  .send("Server Works For"+id)
}
