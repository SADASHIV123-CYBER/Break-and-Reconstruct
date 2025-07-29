const Cart = require("../schema/cartSchema");
const BadRequestError = require('../utils/badRequestError');
const InternalServerError = require('../utils/internalServerError');
const NotFoundError = require("../utils/notFoundError");

async function createCart(userId) {
    try {
        const newCart = await Cart.create({
            user: userId
        });

        return newCart
    } catch (error) {
        console.log(error);

        if(error.name === 'ValidationError') {
            const errorMessageList = Object.keys(error.errors).map(property => {
                error.errors[property].message;
            });

            throw new BadRequestError(errorMessageList)
        }

        console.log(error);
        
        throw new InternalServerError()
    }
}

async function getCartByUserId(userId) {
    try {
        const cart = await Cart.findOne({
            user: userId
        }).populate('item.product');

        return cart
    } catch (error) {
        console.log(error);
        throw new InternalServerError()
    }
};

async function clearCart(userId) {
    try {
        const cart = await Cart.findOne({
            user: userId
        });

        if(!cart) {
            throw new NotFoundError('Cart')
        }

        cart.item = [];
        await cart.save();
        return cart;
    } catch (error) {
        console.log(error);
        
        throw new InternalServerError();
    }
}

module.exports = {
    createCart,
    getCartByUserId,
    clearCart
}