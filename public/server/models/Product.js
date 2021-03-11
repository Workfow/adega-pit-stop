const { Model, DataTypes } = require('sequelize');

class Product extends Model {
  static init(sequelize) {
    super.init({
      icon: DataTypes.STRING,
      name: DataTypes.STRING,
      price: DataTypes.FLOAT,
      amount: DataTypes.INTEGER
    }, {
      sequelize
    })
  }
}

module.exports = Product;