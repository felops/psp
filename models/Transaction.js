module.exports = (sequelize, DataTypes) =>
  sequelize.define('Transaction', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    value: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    method_payment: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    card_number: {
      type: DataTypes.STRING(4),
      allowNull: false
    },
    card_holder_name: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    card_expiry_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    card_cvv: {
      type: DataTypes.STRING(4),
      allowNull: false
    }
  })
