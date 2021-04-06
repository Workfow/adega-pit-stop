const express = require('express');
const path = require('path');
const { multerImage, multerPDF } = require('./config/multer');
const HomeController = require('./controllers/HomeController');
const ProductController = require('./controllers/ProductController');
const PurchaseController = require('./controllers/PurchaseController');
const SalesController = require('./controllers/SalesController');
const CategoryController = require('./controllers/CategoryController');

const Product = require('./models/Product');

const routes = express.Router();

//Inventory
routes.post('/products', multerImage.single('icon'),ProductController.store);
routes.get('/products', ProductController.index);
routes.get('/products/category/:id', ProductController.indexCategory);
routes.put('/products/:id', multerImage.single('icon'),ProductController.update);
routes.delete('/products/:id', ProductController.destroy);

//Financial
routes.post('/purchases', multerPDF.single('invoice'), PurchaseController.store);
routes.get('/purchases', PurchaseController.index);
routes.put('/purchases/:id', multerPDF.single('invoice'), PurchaseController.update);
routes.delete('/purchases/:id', PurchaseController.destroy);

//Home
routes.get('/products-recent',HomeController.product);
routes.get('/purchases-recent', HomeController.purchase);

//Sales
routes.post('/sales', SalesController.store);
routes.get('/sales', SalesController.index);
routes.put('/sales/:id', SalesController.update);
routes.delete('/sales/:id', SalesController.destroy);

//Categories
routes.get('/categories', CategoryController.index);
routes.get('/categories/:id', CategoryController.indexOne);
routes.post('/categories', CategoryController.store);
routes.delete('/categories/:id', CategoryController.destroy);

//Files
routes.get('/icon', (req, resp) => {
  const { icon } = req.query;
  resp.sendFile(path.resolve(__dirname, '..', 'uploads', `images/${icon}`))
})

routes.get('/pdf', (req, resp) => {
  const { pdf } = req.query;
  resp.sendFile(path.resolve(__dirname, '..', 'uploads', `invoices/${pdf}`))
})

module.exports = routes;