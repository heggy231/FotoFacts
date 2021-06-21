'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Photo.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });
    }
  };
  Photo.init({
    title: DataTypes.STRING,
    category: DataTypes.STRING,
    attendee1FirstName: DataTypes.STRING,
    attendee1LastName: DataTypes.STRING,
    attendee2FirstName: DataTypes.STRING,
    attendee2LastName: DataTypes.STRING,
    attendee3FirstName: DataTypes.STRING,
    attendee3LastName: DataTypes.STRING,
    description: DataTypes.STRING,
    url: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Photo',
  });
  return Photo;
};