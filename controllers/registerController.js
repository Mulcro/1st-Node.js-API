const userDB = {
    users: require('../model/users.json'),
    setUsers: function (data) {this.users = data}
};
const bcrypt = require('bcrypt');
const fsPromise = require('fs').promises;
const path = require('path');


const handleNewUser = async (req,res) => {
    const {user,pwd} = req.body;
    if (!user || !pwd ) {return res.status(400).json({"message":"Username and password are required"})};

    //check for duplicates in the db
    const duplicate = userDB.users.find(person => person.username === user);

    if (duplicate) return res.sendStatus(409);

    //create new user
    try{
        const hashedPwd = await bcrypt.hash(pwd,10);

        const newUser = {
            username: user,
            password: hashedPwd
        };

        userDB.setUsers([...userDB.users, newUser]);
        await fsPromise.writeFile(
            path.join(__dirname,'..','model','users.json'),JSON.stringify(userDB.users)
        );
        console.log(userDB.users);
        res.status(201).json({"message":`The user ${user} was successfully created`});
    }
    catch (err){
        console.error(err);
        res.status(500).json({"message":err.message});
    }
}

module.exports = {handleNewUser};