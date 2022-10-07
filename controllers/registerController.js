const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req,res) => {
    const {user,pwd} = req.body;
    if (!user || !pwd ) {return res.status(400).json({"message":"Username and password are required"})};

    //check for duplicates in the db
    const duplicate = await User.findOne({username: user}).exec();
    console.log(duplicate);
    if (duplicate) return res.sendStatus(409);

    //create new user
    try{
        const hashedPwd = await bcrypt.hash(pwd,10);

        const result = await User.create({
            "username": user,
            "password": hashedPwd
        });
        console.log(result);
        res.status(201).json({"message":`The user ${user} was successfully created`});
    }
    catch (err){
        console.error(err);
        res.status(500).json({"message":err.message});
    }
}

module.exports = {handleNewUser};