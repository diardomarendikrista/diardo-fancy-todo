'use strict';
const {
  Model
} = require('sequelize');

const { hashPassword } = require('../helpers/passwordHelper');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo, { foreignKey: 'user_id' });
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'email format incorrect'
        },
        notEmpty: {
          args: true,
          msg: 'email cannot blank'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'password cannot blank'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, option) => {
        user.password = hashPassword(user.password);
      }
    }
  });
  return User;
};