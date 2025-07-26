const express = require('express');
const serverConfig = require('./config/serverConfig');
const connectDB = require('./config/dbConfig');
const userRouter = require('./routes/userRouter');


const app = express();

// app.use(cookieParser());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRouter);

app.get('/ping', (req, res) => {
    console.log(req.body);
    console.log(req.cookies)
    return res.json({
        message: "pong"
    })
})

app.listen(serverConfig.PORT, async () => {
    await connectDB()
    console.log(`Server started at port ${serverConfig.PORT}`);
    
})