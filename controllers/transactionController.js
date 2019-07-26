var express = require('express')
var models  = require('../models')
var Payable = require('../domains/Payable')
var moment = require('moment')

const { check, validationResult } = require('express-validator/check')

exports.get = (req, res) =>
  models.Transaction
    .findAll()
    .then(transactions => res.json({ transactions }))
    .catch(error => res.status(500).json({ error }))

exports.save = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(422).json({ error: errors.array() })
    return
  }

  models.Transaction.create({
    ...req.body,
    card_number: req.body.card_number.substr(-4)
  })
    .then(transaction => {
      let payable = new Payable(transaction.id, transaction.value, transaction.method_payment, transaction.createdAt)

      models.Payable
        .create(payable.getAllData())
        .then(payable => res.json({ message: 'Transaction Approved.' }))
        .catch(error => res.status(500).json({ error }))
    })
    .catch(error => res.status(500).json({ error }))
}

exports.validate = [
  check('value').isFloat(),
  check('description').isString().isLength({ min: 1 }),
  check('method_payment').isIn(['credit_card', 'debit_card']),
  check('card_number').isCreditCard(),
  check('card_holder_name').isString().isLength({ min: 5 }),
  check('card_expiry_date').custom(val => moment(val, 'YYYY-MM', true).isValid()).withMessage('Invalid date'),
  check('card_cvv').isLength({ min: 3 })
]
