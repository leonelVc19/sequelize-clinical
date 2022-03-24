'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class informationHome extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //Informacion de inicio tiene muchas imagenes.
      models.informationHome.hasMany(models.imageInformation,{
        as:'images',
      });
    }
  }
  informationHome.init({
    title: {
      type: DataTypes.STRING,
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
          args: /^[a-zA-Z\u00C0-\u017F\s]+$/,
          msg: 'El campo titulo, solo acepta letras',
        }
      }
    },
    description: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'El campo descripción, no puede quedar vacío',
        },
        len: {
          args: [0,180],
          msg: 'El campo descripción solo acepta 180, caracteres'
        },
        is:{
          args: /^[a-zA-Z\u00C0-\u017F\s]+$/,
          msg: 'El campo descripción, solo acepta letras',
        }
      }
    },
  }, {
    sequelize,
    modelName: 'informationHome',
  });
  return informationHome;
};