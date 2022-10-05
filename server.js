const path = require('path');
const express = require('express');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const app = express();
const {logger} = require('./middleware/logEvents.js');
const errorHandler = require('./middleware/errorHandler.js');
const PORT = process.env.PORT || 3500;

//custom middleware logger
app.use(logger);

//CROSS ORIGIN REASOURCE SHARING
app.use(cors(corsOptions));

//built in middleware to handle urlencoded data which is basically form data
app.use(express.urlencoded({extended: false}));

//built in middleware to handle json
app.use(express.json());

//middleware that allows us to handle static files
app.use(express.static(path.join(__dirname,'public')));

//app
app.use('/', require('./routes/routes'));
app.use('/register',require('./routes/register'));
app.use('/auth',require('./routes/auth'));
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

app.listen(PORT, () => console.log(`Running on port ${PORT}`));