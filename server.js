require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const app = express();
const {logger} = require('./middleware/logEvents.js');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/errorHandler.js');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/dbCon');
const PORT = process.env.PORT || 3500;

//connect to mongodb
connectDB();
//custom middleware logger
// app.use(logger);

//handling credentials check 
app.use(credentials);

//CROSS ORIGIN REASOURCE SHARING
app.use(cors(corsOptions));

//built in middleware to handle urlencoded data which is basically form data
app.use(express.urlencoded({extended: false}));

//built in middleware to handle json
app.use(express.json());

//middleware that allows us to handle static files
app.use(express.static(path.join(__dirname,'public')));

//middleware to pare cookies
app.use(cookieParser());

//app
app.use('/', require('./routes/routes'));
app.use('/register',require('./routes/register'));
app.use('/auth',require('./routes/auth'));
app.use('/refresh',require('./routes/refresh'));
app.use('/logout',require('./routes/logout'));

//Protecting all employee routes with jwt
app.use(verifyJWT); 

app.use('/employees', require('./routes/api/employees'));

app.get('/hello(.html)?', (req,res,next) => {
    console.log('Attempted to fetch hello.html');
    next();
},(req,res) => {
    res.send('Hello World!');
});

app.all('*', (req,res) => {
    res.status(404).sendFile(path.join(__dirname,'views','404.html'));
});

app.use(errorHandler);

mongoose.connection.once('open',() => {
    console.log('Connected to MongoDb');
    app.listen(PORT, () => console.log(`Running on port ${PORT}`));
})