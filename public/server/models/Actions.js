const { Model, DataTypes } = require('sequelize');

class Actions extends Model {
  static init(sequelize) {
    super.init({
      description: DataTypes.STRING
    }, {
      sequelize
    })
  }
}

module.exports = Actions;