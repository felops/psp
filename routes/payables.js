var express = require('express')
var router = express.Router()
var controller  = require('../controllers/payableController')

router.get('/', controller.get)

module.exports = router
