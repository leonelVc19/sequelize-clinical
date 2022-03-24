'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Category.hasMany(models.Customer,{
        as:'customers'
      });
    }
  }
  Category.init({
    name:{
      type:DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'El campo name, no puede quedar vacío',
        },
        len: {
          args: [0,40],
          msg: 'El campo name solo acepta 40, caracteres'
        },
        is:{
          args: /^[a-zA-Z\u00C0-\u017F\s]+$/,
          msg: 'El campo name, solo acepta letras',
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};