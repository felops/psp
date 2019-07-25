module.exports = (sequelize, DataTypes) =>
  sequelize.define('Payable', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    transaction: {
      type: DataTypes.UUID,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    payment_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    fee: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    receivable_value: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  })
