var express = require('express');
var router = express.Router();
const userCtrl = require('../controllers/users.controller');
const authCtrl = require('../controllers/auth.controller');

router
.route('/user')
.get(userCtrl.getUser)
.post(userCtrl.addUser)
.put(userCtrl.updateUser);

router
.route('/users')
.get(userCtrl.getUsers);

router
.route('/register')
.post(authCtrl.registration);
router
.route('/login')
.post(authCtrl.login);
router
.route('/token')
.get(authCtrl.validateToken);

module.exports = router;
