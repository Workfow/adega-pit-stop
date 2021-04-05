const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Category = require('../models/Category');
const Product = require('../models/Product');
const Purchase = require('../models/Purchase');
const Sales = require('../models/Sales');

const connection = new Sequelize(dbConfig);

Category.init(connection);
Product.init(connection);
Purchase.init(connection);
Sales.init(connection);

module.exports = connection;