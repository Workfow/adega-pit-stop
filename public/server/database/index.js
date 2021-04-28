const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Category = require('../models/Category');
const Product = require('../models/Product');
const Purchase = require('../models/Purchase');
const Sales = require('../models/Sales');
const Cashier = require('../models/Cashier');
const Actions = require('../models/Actions');

const connection = new Sequelize(dbConfig);

Category.init(connection);
Product.init(connection);
Purchase.init(connection);
Sales.init(connection);
Cashier.init(connection);
Actions.init(connection);

module.exports = connection;