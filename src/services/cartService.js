// const { createCart, getCartByUserId, clearCart } = require("../repositories/cartRepository");
// const {getProductById} = require('../services/productService');
// const AppError = require("../utils/appError");
// const BadRequestError = require("../utils/badRequestError");
// const NotFoundError = require("../utils/notFoundError");
// async function getCart(userId) {
//     let cart = await getCartByUserId(userId);

//     if(!cart) {
//         cart = await createCart(userId);
//     }

//     return cart;
// }

// async function modifyCart(userId, productId, shouldAdd = true) {
//     const quantityValue = shouldAdd ? 1 : -1;
//     const cart = await getCart(userId);
//     const product = await getProductById(productId);

//     if(!product) {
//         throw new NotFoundError('product not found')
//     }

//     if(!product.inStock || product.quantity <0) {
//         throw new BadRequestError('product is not available in stock');
//     }

//     let foundProduct = false;
    
//     cart.item.forEach((item) => {
//         if(item.product.equals(productId)) {
//             foundProduct = true
//         }

//         if(shouldAdd) {
//             if(product.quantity >= item.quantity + 1) {
//                 item.quantity += quantityValue;
//             } else {
//                 throw new AppError('the quantity of item requested is not available', 400)
//             }
//         } else {
//             if(item.quantity > 0) {
//                 item.quantity += quantityValue

//                 if(item.quantity === 0) {
//                     cart.item = cart.item.filter(item => !item.product.equals(productId));
//                     return;
//                 }
//             }

//             // if(item.quantity === 0) {
//             //     cart.item = cart.item.filter(item => !item.product.equals(productId));
//             //     return;
//             // }
//             else {
//                 throw new AppError('the quantity of item is not available', 400)
//             }
//         }
//     });

//     if(!product && shouldAdd) {
//         cart.item.push({product: productId, quantity: 1})
//     }

//     if(!product && shouldAdd) {
//         throw new BadRequestError('product not found in the cart to remove')
//     }

//     await cart.save()
//     return cart

//     const updateCart = await getCartByUserId(userId);

//     return updateCart
// }

// async function clearProductFromCart(userId) {
//     const product = await clearCart(userId);
//     return product
// }

// module.exports = {
//     getCart,
//     modifyCart,
//     clearProductFromCart
// }


const { createCart, getCartByUserId, clearCart } = require("../repositories/cartRepository");
const { getProductById } = require('../services/productService');
const AppError = require("../utils/appError");
const BadRequestError = require("../utils/badRequestError");
const NotFoundError = require("../utils/notFoundError");

async function getCart(userId) {
    let cart = await getCartByUserId(userId);
    if (!cart) {
        cart = await createCart(userId);
    }
    return cart;
}

async function modifyCart(userId, productId, shouldAdd = true) {
    const quantityValue = shouldAdd ? 1 : -1;
    const cart = await getCart(userId);
    const product = await getProductById(productId);

    if (!product) {
        throw new NotFoundError('product not found');
    }

    if (!product.inStock || product.quantity <= 0) {
        throw new BadRequestError('product is not available in stock');
    }

    let foundProduct = false;

    cart.item.forEach((item, index) => {
        if (item.product.equals(productId)) {
            foundProduct = true;

            if (shouldAdd) {
                if (product.quantity >= item.quantity + 1) {
                    item.quantity += quantityValue;
                } else {
                    throw new AppError('the quantity of item requested is not available', 400);
                }
            } else {
                if (item.quantity > 1) {
                    item.quantity += quantityValue;
                } else {
                    // remove item if quantity becomes 0
                    cart.item.splice(index, 1);
                }
            }
        }
    });

    // if not found in cart and should add, push it
    if (!foundProduct && shouldAdd) {
        cart.item.push({ product: productId, quantity: 1 });
    }

    // if not found in cart and should remove, throw error
    if (!foundProduct && !shouldAdd) {
        throw new BadRequestError('product not found in the cart to remove');
    }

    await cart.save();
    return cart;
}

async function clearProductFromCart(userId) {
    const product = await clearCart(userId);
    return product;
}

module.exports = {
    getCart,
    modifyCart,
    clearProductFromCart
};
