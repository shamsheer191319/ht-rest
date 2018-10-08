require('./models/db.conn');
// require('./models/db.connection').open();
var express = require('express');
var app  = express();
var CONFIG = require('./config');
const path = require('path');
var bodyParser = require('body-parser');
//adding log4js
const log4js = require('log4js');
log4js.configure('./config/log4js.json')
var startUpLog = log4js.getLogger('startup');
var accesslog = log4js.getLogger('access');


try{
  require('fs').mkdirSync('./log');
}catch(error){
  if(error.code !='EEXIST'){
    console.error("Could Not setup log Directory ",error);
    process.exit(1);
  }
}

app.use(express.static(path.join(__dirname,'public')));
//adding looger to express
app.use(log4js.connectLogger(log4js.getLogger('http'),{level:'auto'}))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Content-Type,x-access-token, Accept");
  next();
});

app.use(function(req,res,next){
  // console.log("Hit "+ req.method+ " "+req.url);
  accesslog.info("Hit "+ req.method+ " "+req.url)
  next();
});
app.use(bodyParser.urlencoded({extended:false}));
// parse application/json
app.use(bodyParser.json());
var homeRoutes = require('./routes');
var userRoutes = require('./routes/users.routes');
var hotelRoutes = require('./routes/hotel.routes');
app.use('/api',homeRoutes);
app.use('/api',userRoutes);
app.use('/api',hotelRoutes);

app.listen(CONFIG.PORT,CONFIG.HOST,function(){
  // console.log('Server is Running by Using Express',
  // CONFIG.PORT);
  startUpLog.info('Magic Happens On Port :'+ CONFIG.PORT);
  startUpLog.info('Sever Runs On  http://127.0.0.1:'+ CONFIG.PORT);
});
