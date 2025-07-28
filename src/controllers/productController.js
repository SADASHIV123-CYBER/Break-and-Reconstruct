const { createProduct, getProductById, deleteProductById } = require("../services/productService");

async function addProduct(req, res) {
    try {
        const product = await createProduct({
            productName: req.body.productName,
            description: req.body.description,
            price: req.body.price,
            imgPath: req.file?.path,
            category: req.body.category,
            inStock: req.body.inStock
        });


        console.log('product created : --->',product);
        

        return res.status(201).json({
            success: true,
            message: "Successfully created the product",
            error: {},
            data: product
        });

    } catch (error) {
        console.log(error);

        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Something went wrong",
            error: error,
            data: {}
        });
    }
}

async function getProduct(req, res) {
    try {
        const response = await getProductById(req.params.id);
        return res.status(200).json({
            success: true,
            message: "Product fetched successfully",
            error: {},
            data: response
        });

    } catch (error) {
        console.log(error);

        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Something went wrong",
            error: error,
            data: {}
        });
    }
}

async function deleteProduct(req, res) {
    try {
        const response = await deleteProductById(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            error: {},
            data: response
        });

    } catch (error) {
        console.log(error);

        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Something went wrong",
            error: error,
            data: {}
        });
    }
}

module.exports = {
    addProduct,
    getProduct,
    deleteProduct
};
