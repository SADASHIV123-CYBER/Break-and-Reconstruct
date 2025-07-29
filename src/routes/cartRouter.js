const express = require('express');
const { isLoggedIn } = require('../validation/authValidator');
const { getCartByUser, modifyProductToCart, clearCartById } = require('../controllers/cartController');

const cartRouter = express.Router();

cartRouter.get('/', isLoggedIn, getCartByUser);
cartRouter.post('/:operation/:productId', isLoggedIn, modifyProductToCart);
cartRouter.delete('/products', isLoggedIn, clearCartById);

module.exports = cartRouter;