const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, "Product name is required"],
        // minlength: [5, "Product character atleast 5 required"],
        trim: true
    },
    
    description: {
        type: String,
        minlength: [5, "product description must be atleast 5 character"],
        // trim: true
    },

    price: {
        type: Number, 
        required: [true, "price is required"]
    },

    quantity: {
        type: Number,
        require: [true, "product is required"],
        default: 10
    },

    category: {
        type: String,
        enum: ["veg", "non-veg", "drinks", "sides"],
        default: "veg"
    },

    inStock: {
        type: Boolean,
        default: true,
        required: [true, "instock status is required"]
    }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;