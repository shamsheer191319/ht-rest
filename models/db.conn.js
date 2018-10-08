const mongoose = require('mongoose');
const CONFIG = require('../config');
require('./hotels.model');
require('./users.model');
const options= {
  user:CONFIG.DBUSR,
  pass:CONFIG.DBPASSWD,
  authSource:CONFIG.AUTHSRC,
  useNewUrlParser: true
}
mongoose.connect(CONFIG.DBURL,options);
var _conn = mongoose.connection;
_conn.on('error',function(error){
  console.error('Connection Faild To DB !!');
  console.log(error);
});
_conn.once('open',function(){
  console.log("Mongoose Connection Successfull !!");
});
function graceFullShutdown(signal,callback){
  _conn.close(()=>{
    console.log(`Server Termination Due to ${signal} in Mongoose`);
    callback();
  });
}

process.on('SIGINT',()=>{
  graceFullShutdown('SIGINT',function(){
    process.exit(0)
  });
});
process.once('SIGTERM',()=>{
  graceFullShutdown('SIGTERM',function(){
    process.exit(0)
  });
});
process.once('SIGUSR2',()=>{
  graceFullShutdown('SIGUSR2',function(){
    process.kill(process.pid,'SIGUSR2')
  });
});
