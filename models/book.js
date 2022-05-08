'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  book.init({
    productname: DataTypes.STRING,
    dtail: DataTypes.STRING,
    price: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    productowner: DataTypes.STRING,
    status: DataTypes.INTEGER,
    score: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'books',
    tableName: 'books'
  });
  return book;
};