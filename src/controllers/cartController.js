const { getCart, modifyCart, clearProductFromCart } = require("../services/cartService");
const AppError = require("../utils/appError");

async function getCartByUser(req, res) {
    try {
        const cart = await getCart(req.user.id)

        return res.status(200).json({
            success: true,
            message: "successfully fetched the cart",
            error: {},
            data: cart
        });
    } catch (error) {
        if(error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                error: error,
                message: error.message,
                data: {}
            });
        }

        return res.status(500).json({
            success: true,
            error: error,
            message: 'something went wrong',
            data: {}
        })
    }
}

async function modifyProductToCart(req, res) {
    try {
        const cart = await modifyCart(req.user.id, req.params.productId, req.params.operation == "add");

        return res.status(200).json({
            success: true,
            message: 'successfully added product to the cart',
            error: {},
            data: cart
        })
    } catch (error) {
        if(error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                error: error,
                message: error.message,
                data: {}
            })
        }

        console.log(error);
        
        return res.status(500).json({
            return: false,
            error: error,
            message: 'something went wrong',
            data: {}
        })
    }
}

async function clearCartById(req, res) {
    try {
        const cart = await clearProductFromCart(req.user.id); 

        return res.status(200).json({
            success: true,
            error: {},
            message: 'successfully cleared all product from cart',
            data: cart
        })
    } catch(error) {
        if(error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                error: error,
                message: error.message,
                data: {}
            })
        }

        return res.status(500).json({
            success: false,
            error: error,
            message: 'something wnet wrong',
            data: {}
        })
    }
}

module.exports = {
    getCartByUser,
    modifyProductToCart,
    clearCartById
}