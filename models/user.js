const bcrypt = require('bcrypt');

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'El campo nombre, no puede quedar vacío',
        },
        len: {
          args: [0,64],
          msg: 'El campo nombre solo acepta 64, caracteres'
        },
        is:{
          args: /^[a-zA-Z\u00C0-\u017F\s]+$/,
          msg: 'El campo nombre, solo acepta letras',
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
          args: [0,128],
          msg: 'El campo email, solo acepta 128, caracteres'
        }
      }
    },
    password:  {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'El campo contrase;a, no puede quedar vacío',
        },
        len: {
          args: [0,164],
          msg: 'El campo contrase;a solo acepta 164, caracteres'
        },
      }
    },
    rol:  {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'El campo rol, no puede quedar vacío',
        },
        len: {
          args: [0,20],
          msg: 'El campo rol solo acepta 164, caracteres'
        },
      }
    },
    active: {
      type:  DataTypes.BOOLEAN,
      validate: {
        notEmpty: {
          args: true,
          msg: 'El campo activo, no puede quedar vacío',
        },
      }
    },
    passwordResetToken: DataTypes.STRING,
    passwordResetExpire: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
  });

  User.prototype.isValidPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  }
  
  return User;
};