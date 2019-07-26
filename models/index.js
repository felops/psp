var Sequelize = require("sequelize")

var sequelize = new Sequelize('psp', 'psp', '2e(2jHmu{N',
  {
    dialect: 'mysql',
    port: 41890,
    host: 'mysql669.umbler.com'
  }
)

var db = {
  sequelize: sequelize,
  Transaction: sequelize.import('Transaction.js'),
  Payable: sequelize.import('Payable.js')
}

db.Transaction.hasMany(db.Payable, {foreignKey: 'transaction'})
db.Payable.belongsTo(db.Transaction, {foreignKey: 'transaction'})

module.exports = db
