const { Model, DataTypes } = require('sequelize');

class Cashier extends Model {
  static init(sequelize) {
    super.init({
      value: DataTypes.FLOAT,
      isOpen: DataTypes.BOOLEAN,
    }, {
      sequelize
    })
  }
}

module.exports = Cashier;