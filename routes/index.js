var express = require('express');
var router = express.Router();
const homeCtrl = require('../controllers/home.controller');
const userCtrl = require('../controllers/users.controller');

router
.route('/home/:id')
.get(homeCtrl.home);


module.exports = router;
