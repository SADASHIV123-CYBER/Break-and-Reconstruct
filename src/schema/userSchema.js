const { default: mongoose } = require("mongoose");
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: [true, "first name is required"],
        minlength: [5, "first name must be atleast 5 character long"],
        lowercase: true,
        trim: true,
        maxlenght: [20, "first name should be less than or equal to 20 characters"]
    },

    lastName: {
        type: String,
        require: [true, "last name is required"],
        minlength: [4, "last name must be atleast 4 character long"],
        lowercase: true, 
        trim: true,
        maxlenght: [20, "last name should be less than or equal to 20 characters"]
    },

    mobileNumber: {
        type: Number,
        require: [true, "phone number is required"],
        trim: true,
        unique: [true, "the give number is already used"],
        minlength: [10, "phone number should be of lenght 10"],
        maxlenght: [10, "phone number should be of lenght 10"],
        require: [true, "phone number should be provided"]
    },

    email: {
        type: String,
        require: [true, "email should be provided"],
        trim: true,
        unique: [true, "email is already in use"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'please fill a valid email address']
    },

    password: {
        type: String,
        require: [true, "password should be provided"],
        minlength: [6, "password should be minimum 6 character long"]
    },

    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    }
});

userSchema.pre('save', async function () {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword
})

const User = mongoose.model("User", userSchema);
module.exports = User;