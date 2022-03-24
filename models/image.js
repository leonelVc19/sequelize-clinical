'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //Una imagen pertenece a un tratamiento
      models.Image.belongsTo(models.Treatment,{
        as:'treatment',
        foreignKey: 'treatmentId'
      });
    }
  }
  Image.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'El campo de titulo, no puede quedar vacío',
        },
        len: {
          args: [0,60],
          msg: 'El campo de titulo, solo acepta 60 caracteres',
        },
      }
    },
    path:  DataTypes.STRING,
    treatmentId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'El campo de tratamiento ID, no puede quedar vacío',
        },
        len: {
          args: [0,5],
          msg: 'El campo de tratamiento ID, solo acepta 5 caracteres',
        },
        isNumeric:{
          args: true,
          msg: 'El campo de tratamiento ID, solo acepta caracteres numericos.',
        },
      }
    },

  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};