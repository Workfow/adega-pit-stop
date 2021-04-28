const { Model, DataTypes } = require('sequelize');

class Purchase extends Model {
  static init(sequelize) {
    super.init({
      invoice: DataTypes.STRING,
      description: DataTypes.STRING,
      provider: DataTypes.STRING,
      value: DataTypes.FLOAT,
      products: DataTypes.ARRAY(DataTypes.JSON)
    }, {
      sequelize
    })
  }
}

module.exports = Purchase;