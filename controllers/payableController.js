var express = require('express')
var models  = require('../models')
var Payable = require('../domains/Payable')

exports.get = (req, res) =>
  models.sequelize.query(
    `
      SELECT
        (SELECT SUM(receivable_value) FROM Payables WHERE status = 'paid') available,
        (SELECT SUM(receivable_value) FROM Payables WHERE status = 'waiting_funds') waiting_funds
    `,
    { type: models.sequelize.QueryTypes.SELECT }
  )
    .then(data => res.json(data[0]))
    .catch(error => res.status(500).json({ error }))
