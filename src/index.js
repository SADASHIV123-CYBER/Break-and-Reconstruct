const express = require('express');
const serverConfig = require('./config/serverConfig');
const connectDB = require('./config/dbConfig');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/authRouter');
const uploader = require('./middlewares/multerMiddleware');
const fs = require('fs/promises');
const cloudinary = require('./config/cloudnaryConfig');



const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/auth', authRouter);

app.get('/ping', (req, res) => {
    console.log(req.body);
    console.log(req.cookies)
    return res.json({
        message: "pong"
    })
})

app.post('/photo', uploader.single('incommingFile'), async (req, res) => {
    console.log(req.file);
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log("result from cloudinary", result);
    await fs.unlink(req.file.path);
    return res.json({
        message: 'ok'
    })
});

app.listen(serverConfig.PORT, async () => {
    await connectDB()
    console.log(`Server started at port ${serverConfig.PORT}`);
    
})