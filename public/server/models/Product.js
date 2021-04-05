const { Model, DataTypes } = require('sequelize');

class Product extends Model {
  static init(sequelize) {
    super.init({
      icon: DataTypes.STRING,
      barcode: DataTypes.STRING,
      name: DataTypes.STRING,
      price: DataTypes.FLOAT,
      amount: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER
    }, {
      sequelize
    })
  }
}

module.exports = Product;