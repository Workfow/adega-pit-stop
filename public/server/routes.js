const express = require('express');
const { multerImage, multerPDF } = require('./config/multer');
const HomeController = require('./controllers/HomeController');
const ProductController = require('./controllers/ProductController');
const PurchaseController = require('./controllers/PurchaseController');

const routes = express.Router();

//Inventory
routes.post('/products', multerImage.single('icon'),ProductController.store);
routes.get('/products', ProductController.index);
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

module.exports = routes;