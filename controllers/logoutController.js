const User = require('../model/User');

const handleLogout = async (req,res) => {
    //remember to delete access token from frontend

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);

    // is refresh token in db?
    const refreshToken = cookies.jwt;
    const foundUser = await User.findOne({refreshToken}).exec();
    if(!foundUser) {
        res.clearCookie('jwt',{httpOnly: true, sameSite: 'None'}); // add {secure: true} in production
        res.sendStatus(204);
    };

    //delete refresh token in db
    foundUser.refreshToken = "";
    const result = await foundUser.save();
    if (!result) return res.sendStatus(500);

    res.clearCookie('jwt',{httpOnly: true, sameSite: 'None'}); //When in production also add secure: true to ensure that the requests are only sent on https
    res.sendStatus(204);
}

module.exports = {handleLogout};