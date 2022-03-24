'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Treatment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //un tratamientos tiene muchas imaganes.
      models.Treatment.hasMany(models.Image,{
        as:'images',
      });
    }
  }
  Treatment.init({
    title:{
      type:  DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'El campo titulo, no puede quedar vacío',
        },
        len: {
          args: [0,40],
          msg: 'El campo titulo solo acepta 40, caracteres'
        },
        is:{
          args: /^[a-zA-Z\u00C0-\u017F\s/$ ¿ ?  . , : ( ) ]+$/,
          msg: 'El campo titulo, solo acepta letras',
        }
      }
    },
    payment: {
      type: DataTypes.DECIMAL,
      validate: {
        notEmpty: {
          args: true,
          msg: 'El campo pago, no puede quedar vacío',
        },
        len: {
          args: [0,15],
          msg: 'El campo pago solo acepta 40, caracteres'
        },
        isNumeric:{
          args: true,
          msg: 'El campo pago o cantidad, solo acepta caracteres numericos.',
        }
      }
    },
    titleDescription: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'El campo titulo de descripción, no puede quedar vacío',
        },
        len: {
          args: [0,50],
          msg: 'El campo titulo de descripción solo acepta 40, caracteres',
        },
        is:{
          args: /^[a-zA-Z\u00C0-\u017F\s/$ ¿ ?  . , : ( ) ]+$/,
          msg: 'El campo titulo de descripción, solo acepta letras',
        }

      }
    },

    descriptions: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'El campo descripción, no puede quedar vacío',
        },
        len: {
          args: [0,600],
          msg: 'El campo titulo solo acepta 60, caracteres',
        },
        is:{
          args: /^[a-zA-Z\u00C0-\u017F\s/$ ¿ ?  . , : ( ) ]+$/,
          msg: 'El campo descripción, solo acepta letras',
        }
      }
    },
    
  }, {
    sequelize,
    modelName: 'Treatment',
  });
  return Treatment;
};