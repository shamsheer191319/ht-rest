const MongoClient = require('mongodb').MongoClient;
const CONFIG = require('../config');
var connection = null;
function open(){
  MongoClient.connect(CONFIG.DBURL,{authSource:CONFIG.AUTHSRC},
    function(error,client){
    if(error){
      console.log('Error In DB Connection!');
    }else{
      connection= client;
      console.log('Connection Success! To MONGO');
    }
  });
}
function get(){
  return connection;
}
// console.log(process);


module.exports = {
  open:open,
  get:get
};
