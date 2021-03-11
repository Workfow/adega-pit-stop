const { Model, DataTypes } = require('sequelize');

class Purchase extends Model {
  static init(sequelize) {
    super.init({
      invoice: DataTypes.STRING,
      description: DataTypes.STRING,
      value: DataTypes.FLOAT 
    }, {
      sequelize
    })
  }
}

module.exports = Purchase;