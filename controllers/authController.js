const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req,res) =>{
    const {user,pwd} = req.body;
    if (!user || !pwd ) return res.status(400).json({"message":"Username and password are required"});

    const foundUser = await User.findOne({username: user}).exec();
    if(!foundUser) return res.sendStatus(401);
    //evalutate password
    const match = await bcrypt.compare(pwd, foundUser.password)

    if (match) {
        const roles = Object.values(foundUser.roles);
        const accessToken = jwt.sign(
            {"userInfo": {
                "username":foundUser.username,
                "roles": roles    
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '300s'}
        );
        const refreshToken = jwt.sign(
            {"username": foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        );

        //Saving refresh token with current user
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        
        if(!result) return res.sendStatus(500);

        res.cookie('jwt',refreshToken,{httpOnly: true, sameSite: 'None', maxAge: 24*60*60*1000}); //add {secure: true} when in production
        res.json({accessToken});
    }
    else{
        res.sendStatus(401);
    }
}

module.exports = {handleLogin};