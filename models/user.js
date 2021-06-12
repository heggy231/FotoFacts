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
  };
  User.init({
    eventTitle: DataTypes.STRING,
    attendee1Name: DataTypes.STRING,
    attendee2Name: DataTypes.STRING,
    attendee3Name: DataTypes.STRING,
    eventSummary: DataTypes.STRING,
    insertLinktoPhoto: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};