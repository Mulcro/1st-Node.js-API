const {logEvents} = require('./logEvents.js')

const errorHandler = (err,req,res,next) => {
    logEvents(`${err.name}: ${err.message}`,'errLogs.txt');
    console.error(err.stack);
    res.status(err.status || 500).send(err.message);
}

module.exports = errorHandler;