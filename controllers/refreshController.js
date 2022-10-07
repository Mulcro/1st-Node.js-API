const User = require('../model/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req,res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({refreshToken: refreshToken}).exec();
    if(!foundUser) return res.sendStatus(403);
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err,decoded) => {
            const roles = Object.values(foundUser.roles);
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
            const accessToken = jwt.sign(
                {"userInfo": {
                    "username": decoded.username,
                    "roles": roles  
                }
            },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '30s'}
            );
            return res.json({"accessToken": accessToken});
        }
    );
}

module.exports = {handleRefreshToken}