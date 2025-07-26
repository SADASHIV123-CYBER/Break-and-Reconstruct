const cloudinary = require('../config/cloudnaryConfig');
const InternalServerError = require('../utils/internalServerError');
const productRepository = require('../repositories/productRepository');
const NotFoundError = require('../utils/notFoundError');

async function createProduct(productDetails) {
    const imgPath = productDetails.imgPath

    if(imgPath) {
        try {
            const cloudinaryResponce = cloudinary.uploader.upload(imgPath);
            var productImage = (await cloudinaryResponce).secure_url
        } catch(error) {
            console.log(error);
            throw new InternalServerError();
        }
    }

    const product  = await productRepository.createProduct({
        ...productDetails,
        productImage: productImage
    })
    return product
}


async function  getProductById(productId) {
    const responce = productRepository.createProduct(productId)
    if(!responce) {
        throw new NotFoundError('Product')
    }
    return responce
}

async function  deleteProductById(productId) {
    const responce = productRepository.deleteProductById(productId);
    if(!responce) {
        throw new NotFoundError('Product')
    }
}

module.exports = {
    createProduct,
    getProductById,
    deleteProductById
}
