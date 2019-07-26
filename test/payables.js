var chai = require('chai')
var should = chai.should()
var Payable = require('../domains/Payable')


describe('Payables', () => {
  describe('#Create payable object', () => {
    it('should create a credit_card payable', () => {
      let fee = 5,
          value = 55.2,
          payment_date = new Date(),
          payment_post30days = new Date(new Date().setDate(payment_date.getDate() + 30)),
          payable = new Payable('id0001', value, 'credit_card', payment_date).getAllData()

        payable.status.should.be.equal('waiting_funds')
        payable.payment_date.should.be.eql(payment_post30days)
        payable.fee.should.be.equal(fee)
        payable.receivable_value.should.be.equal(value * (100 - fee) / 100)
    })

    it('should create a debit_card payable', () => {
      let fee = 3,
          value = 55.2,
          payment_date = new Date(),
          payable = new Payable('id0001', value, 'debit_card', payment_date).getAllData()

        payable.status.should.be.equal('paid')
        payable.payment_date.should.be.eql(payment_date)
        payable.fee.should.be.equal(fee)
        payable.receivable_value.should.be.equal(value * (100 - fee) / 100)
    })
  })
})
