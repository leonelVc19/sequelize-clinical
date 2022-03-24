'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      //Un cliente pertenece a una categoría.
      models.Customer.belongsTo(models.Category, {
        as: 'category',
        foreignKey: 'categoryId',
      });

      //Un cliente tiene muchas citas.
      models.Customer.hasMany(models.Appointment, {
      as: 'appointments',
    })
      
    }
  }
  Customer.init({
    name:{
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'El campo nombre, no puede quedar vacío',
        },
        len: {
          args: [0,30],
          msg: 'El campo nombre solo acepta 30, caracteres'
        },
        is:{
          args: /^[a-zA-Z\u00C0-\u017F\s]+$/,
          msg: 'El campo nombre, solo acepta letras',
        }
      }
    }, 

    lastName:{
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'El campo apellido, no puede quedar vacío',
        },
        len: {
          args: [0,30],
          msg: 'El campo apelledio, solo acepta 30, caracteres'
        },
        is:{
          args: /^[a-zA-Z\u00C0-\u017F\s]+$/,
          msg: 'El campo apellido, solo acepta letras',
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'El campo email, no puede quedar vacío',
        },
        isEmail:{
          args: true,
          msg: 'El campo emial, solo acepta email validos',
        },
        len: {
          args: [0,30],
          msg: 'El campo email, solo acepta 30, caracteres'
        }
      }
    },
    phone: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'El campo teléfono, no puede quedar vacío',
        },
        isNumeric:{
          args: true,
          msg: 'El campo teléfono, solo acepta caracteres, numericos',
        },
        len: {
          args: [1,10],
          msg: 'El campo teléfono, solo acepta 10, caracteres'
        },
        is:{
          args: /^[0-9]{3}[0-9]{7}$/,
          msg: 'No es un número teléfonico, valido',
        }
      }
    },
    age: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'El campo edad, no puede quedar vacío',
        },
        isNumeric:{
          args: true,
          msg: 'El campo edad, solo acepta caracteres, numericos',
        },
        len: {
          args: [0,2],
          msg: ' El campo edad, solo acepta 2 caracteres'
        }
      }
    },
    categoryId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};