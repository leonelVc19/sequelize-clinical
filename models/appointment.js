'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ///Una cita pertenece a un cliente
      models.Appointment.belongsTo(models.Customer,{
        as: 'customerinfo',
        foreignKey: 'customerId'
      });
    

    }
  }
  Appointment.init({
    treatment: {
      type:      DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'El campo tratamiento, no puede quedar vacío',
        },
        len: {
          args: [0,40],
          msg: 'El campo tratamiento solo acepta 40, caracteres'
        },
        is:{
          args: /^[a-zA-Z\u00C0-\u017F\s]+$/,
          msg: 'El campo tratamiento, solo acepta letras',
        }
      }
    },

    description:  {
      type:      DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'El campo descripción, no puede quedar vacío',
        },
        len: {
          args: [0,80],
          msg: 'El campo descripción solo acepta 80, caracteres'
        },
      }
    },

    type: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'El campo tipo, no puede quedar vacío',
        },
        len: {
          args: [0,15],
          msg: 'El campo tipo solo acepta 15, caracteres'
        },
        is:{
          args: /^[a-zA-Z\u00C0-\u017F\s]+$/,
          msg: 'El campo tipo, solo acepta letras',
        }
      }
    },

    gender: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'El campo género, no puede quedar vacío',
        },
        len: {
          args: [0,15],
          msg: 'El campo género, solo acepta 15, caracteres'
        },
        is:{
          args: /^[a-zA-Z\u00C0-\u017F\s]+$/,
          msg: 'El campo género, solo acepta letras',
        }
      }
    },

    date: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          args: true,
          msg: 'El campo fecha, no puede quedar vacío',
        },
      }
    },

    customerId:  {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric:{
          args: true,
          msg: 'El campo ID cliente, solo acepta caracteres, numericos',
        },
        len: {
          args: [0,10],
          msg: ' El campo ID cliente, solo acepta 10 caracteres'
        }
      }
    },

  }, {
    sequelize,
    modelName: 'Appointment',
  });
  return Appointment;
};