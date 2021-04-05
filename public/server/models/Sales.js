const { Model, DataTypes } = require('sequelize');

class Sales extends Model {
  static init(sequelize) {
    super.init({
      description: DataTypes.ARRAY(DataTypes.STRING),
      value: DataTypes.FLOAT
    }, {
      sequelize
    })
  }
}

module.exports = Sales;