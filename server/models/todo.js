'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'title cannot empty'
        }
      }
    },
    description: DataTypes.STRING,
    status: {
      type: DataTypes.BOOLEAN,
      validate: {
        notEmpty: {
          args: true,
          msg: 'status cannot empty'
        },
        isBoolean: {
          args: true,
          msg: 'status should boolean (true / false)'
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        checkDate(value) {
          const today = new Date();
          if (value <= today) throw new Error('Date must older than today');
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};