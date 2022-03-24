'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class imageInformation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //Una imagen pertenese a informacion de inicio
      models.imageInformation.belongsTo(models.informationHome,{
        as:'information',
        foreignKey: 'informationHomeId'
      });
    }
  }
  imageInformation.init({
    title: {
      type:DataTypes.STRING,
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
    path: DataTypes.STRING,
    informationHomeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'imageInformation',
  });
  return imageInformation;
};