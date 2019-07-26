module.exports = class Payable {
  constructor(transaction_id, transaction_value, method_payment, createdAt) {
    let feeDebitCard  = 3,
        feeCreditCard = 5,
        isDebit       = method_payment === 'debit_card',
        status        = isDebit ? 'paid' : 'waiting_funds',
        payment_date  = isDebit ? createdAt : new Date(createdAt.setDate(createdAt.getDate() + 30)),
        fee           = isDebit ? feeDebitCard : feeCreditCard

    this.transaction      = transaction_id
    this.status           = status
    this.payment_date     = payment_date
    this.fee              = fee
    this.receivable_value = (100 - fee) * transaction_value / 100
  }

  getAllData() {
    return {
      transaction: this.transaction,
      status: this.status,
      payment_date: this.payment_date,
      fee: this.fee,
      receivable_value: this.receivable_value
    }
  }
}
