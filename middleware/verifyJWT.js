const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req,res,next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.sendStatus(401);

    const authToken = authHeader.split(' ');
    if (authToken.length != 2) return res.sendStatus(401);
    if (authToken[0] != 'Bearer') return res.sendStaus(401);

    const token = authToken[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decoded) => {
            if (err) return res.sendStatus(403);
            req.user = decoded.username;
            next();
        }
    )
    return true;
}

module.exports = verifyJWT;