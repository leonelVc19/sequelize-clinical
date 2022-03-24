'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      models.Order.belongsTo(models.Appointment, {
        as: 'appointmentsInfo',
        foreignKey: 'appointmentId',
      });
    }
  }
  Order.init({
    payment: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'El campo pago, no puede quedar vacío',
        },
        len: {
          args: [0,15],
          msg: 'El campo pago solo acepta 15, caracteres'
        },
        isNumeric:{
          args: true,
          msg: 'El campo pago, solo acepta caracteres, numericos',
        },
      }
    },
    paymentDate: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          args: true,
          msg: 'El campo fecha de pago, no puede quedar vacío',
        },
        len: {
          args: [0,60],
          msg: 'El campo fecha de pago, solo acepta 40 caracteres'
        },
     
      }
    },
    appointmentId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};