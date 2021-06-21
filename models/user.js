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
      User.hasMany(models.Photo, {
        foreignKey: 'userId'
      });
    }
  };
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
<<<<<<< HEAD
    avatar: DataTypes.STRING
=======
    avatarURL: DataTypes.STRING,
    loginStrategy: DataTypes.STRING,
    loginStrategyId: DataTypes.STRING,
    username: DataTypes.STRING
>>>>>>> main
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};