const userDB = {
    users: require('../model/users.json'),
    setUsers: function (data) {this.users = data}
};
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = (req,res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = userDB.users.find(person => person.refreshToken === refreshToken);    
    if(!foundUser) return res.sendStatus(403);
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err,decoded) => {
            console.log(decoded);
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
            console.log('No error');
            const accessToken = jwt.sign(
                {"username": decoded.username},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '30s'}
            );
            return res.json({"accessToken": accessToken});
        }
    );
}

module.exports = {handleRefreshToken}