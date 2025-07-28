const express = require('express');
const { addProduct, getProduct, deleteProduct } = require('../controllers/productController');
const { isLoggedIn, isAdmin } = require('../validation/authValidator');
const uploader = require('../middlewares/multerMiddleware')

const productRouter = express.Router();

productRouter.post('/', isLoggedIn, isAdmin, uploader.single('productImage'), addProduct);
productRouter.get('/:id', getProduct);
productRouter.delete('/:id', deleteProduct);

module.exports = productRouter