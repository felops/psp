var express = require('express')
var router = express.Router()
var controller  = require('../controllers/transactionController')

router
  .get('/', controller.get)
  .post('/', controller.validate, controller.save)

module.exports = router
