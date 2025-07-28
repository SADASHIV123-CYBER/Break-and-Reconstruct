const Product = require("../schema/productSchema");
const BadRequestError = require("../utils/badRequestError");
const InternalServerError = require("../utils/internalServerError");

async function createProduct(productDetails) {
    try {
        const responce = await Product.create(productDetails);
        return responce
    } catch(error) {
        if(error.name === 'ValidationError') {
            const errorMessageList = Object.keys(error.errors).map(property  => {
                return error.errors[property].message;
            });

            throw new BadRequestError(errorMessageList)
        }
        console.log(error)
        throw new InternalServerError();
    }
}
async function getProductById(productId) {
    try {
        const product = Product.findById(productId);
        return product
    } catch (error) {
        console.log(error);
        throw new InternalServerError()
    }
}

async function deleteProductById(productId) {
    try {
        const product = Product.findByIdAndDelete(productId);
        return product
    } catch (error) {
        console.log(error);
        throw new InternalServerError()
    }
}
module.exports = {
    createProduct,
    getProductById,
    deleteProductById
}