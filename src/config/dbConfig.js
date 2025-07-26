const { default: mongoose } = require("mongoose");
const serverConfig = require("./serverConfig");

async function connectDB() {
    try {
        await mongoose.connect(serverConfig.DB_URL);
        console.log("succesfully connected to mongodb");
        
    } catch(error) {
        console.log("not able to connect mongodb");
        console.log(error);
    }
}

module.exports = connectDB