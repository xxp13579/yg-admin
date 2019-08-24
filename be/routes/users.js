var express = require('express')
var router = express.Router()

const UsersController = require('../controllers/users')
router.post('/signup', UsersController.signup)
router.post('/signin', UsersController.signin)
router.get('/isSignin', UsersController.isSignin) // 这是开发的接口
router.get('/signout', UsersController.signout)

module.exports = router
