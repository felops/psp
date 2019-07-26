var chai = require('chai')
var should = chai.should()
var chaiHTTP = require('chai-http')

chai.use(chaiHTTP)

var url = 'http://localhost:3000',
    card = '4111111111111111'

describe('Transactions', () => {
  describe('#Post transactions', () => {
    it('should create a error for transaction without value', () => {
      chai
        .request(url)
        .post('/transactions')
        .send({
          description: 'Smartband XYZ 3.0',
          method_payment: 'credit_card',
          card_number: card,
          card_holder_name: 'Felipe Lopes',
          card_expiry_date: '2019-10',
          card_cvv: 251
        })
        .end((err, res) => {
          res.should.have.status(422)
          res.text.should.include.any.string('"param":"value"')
        })
    })

    it('should create a error for transaction without description', () => {
      chai
        .request(url)
        .post('/transactions')
        .send({
          value: 56.98,
          method_payment: 'credit_card',
          card_number: card,
          card_holder_name: 'Felipe Lopes',
          card_expiry_date: '2019-10',
          card_cvv: 251
        })
        .end((err, res) => {
          res.should.have.status(422)
          res.text.should.include.any.string('"param":"description"')
        })
    })

    it('should create a error for transaction without method_payment', () => {
      chai
        .request(url)
        .post('/transactions')
        .send({
          value: 56.98,
          description: 'Smartband XYZ 3.0',
          card_number: card,
          card_holder_name: 'Felipe Lopes',
          card_expiry_date: '2019-10',
          card_cvv: 251
        })
        .end((err, res) => {
          res.should.have.status(422)
          res.text.should.include.any.string('"param":"method_payment"')
        })
    })

    it('should create a error for transaction without card_number', () => {
      chai
        .request(url)
        .post('/transactions')
        .send({
          value: 56.98,
          description: 'Smartband XYZ 3.0',
          method_payment: 'credit_card',
          card_holder_name: 'Felipe Lopes',
          card_expiry_date: '2019-10',
          card_cvv: 251
        })
        .end((err, res) => {
          res.should.have.status(422)
          res.text.should.include.any.string('"param":"card_number"')
        })
    })

    it('should create a error for transaction without card_holder_name', () => {
      chai
        .request(url)
        .post('/transactions')
        .send({
          value: 56.98,
          description: 'Smartband XYZ 3.0',
          method_payment: 'credit_card',
          card_number: card,
          card_expiry_date: '2019-10',
          card_cvv: 251
        })
        .end((err, res) => {
          res.should.have.status(422)
          res.text.should.include.any.string('"param":"card_holder_name"')
        })
    })

    it('should create a error for transaction without card_expiry_date', () => {
      chai
        .request(url)
        .post('/transactions')
        .send({
          value: 56.98,
          description: 'Smartband XYZ 3.0',
          method_payment: 'credit_card',
          card_number: card,
          card_holder_name: 'Felipe Lopes',
          card_cvv: 251
        })
        .end((err, res) => {
          res.should.have.status(422)
          res.text.should.include.any.string('"param":"card_expiry_date"')
        })
    })

    it('should create a error for transaction with invalid date for card_expiry_date', () => {
      chai
        .request(url)
        .post('/transactions')
        .send({
          value: 56.98,
          description: 'Smartband XYZ 3.0',
          method_payment: 'credit_card',
          card_number: card,
          card_holder_name: 'Felipe Lopes',
          card_expiry_date: 'teste',
          card_cvv: 251
        })
        .end((err, res) => {
          res.should.have.status(422)
          res.text.should.include.any.string('"param":"card_expiry_date"')
        })
    })

    it('should create a error for transaction without card_cvv', () => {
      chai
        .request(url)
        .post('/transactions')
        .send({
          value: 56.98,
          description: 'Smartband XYZ 3.0',
          method_payment: 'credit_card',
          card_number: card,
          card_holder_name: 'Felipe Lopes',
          card_expiry_date: '2019-10'
        })
        .end((err, res) => {
          res.should.have.status(422)
          res.text.should.include.any.string('"param":"card_cvv"')
        })
    })

    it('should insert transaction with credit card and show successful message', () => {
      chai
        .request(url)
        .post('/transactions')
        .send({
          value: 100,
          description: 'Smartband XYZ 3.0',
          method_payment: 'credit_card',
          card_number: card,
          card_holder_name: 'Felipe Lopes',
          card_expiry_date: '2019-10',
          card_cvv: 251
        })
        .end((err, res) => {
          res.should.be.json
          res.should.have.status(200)
          res.body.message.should.equal('Transaction Approved.')
        })
    })

    it('should insert transaction with debit card and show successful message', () => {
      chai
        .request(url)
        .post('/transactions')
        .send({
          value: 100,
          description: 'Smartband XYZ 3.0',
          method_payment: 'debit_card',
          card_number: card,
          card_holder_name: 'Felipe Lopes',
          card_expiry_date: '2019-10',
          card_cvv: 251
        })
        .end((err, res) => {
          res.should.be.json
          res.should.have.status(200)
          res.body.message.should.equal('Transaction Approved.')
        })
    })
  })

  describe('#Get transactions', () => {
    it('should return all transactions', () => {
      chai
        .request(url)
        .get('/transactions')
        .end((err, res) => {
          res.should.to.be.an('object')
        })
    })
  })
})
