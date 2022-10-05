const userDB = {
    users: require('../model/users.json'),
    setUsers: function (data) {this.users = data}
};
const bcrypt = require('bcrypt');

const handleLogin = async (req,res) =>{
    const {user,pwd} = req.body;
    if (!user || !pwd ) return res.status(400).json({"message":"Username and password are required"});

    const foundUser = userDB.users.find(person => person.username === user);
    console.log(foundUser);
    if(!foundUser) return res.sendStatus(401);

    //evalutate password
    const match = await bcrypt.compare(pwd, foundUser.password)

    if (match) {
        //create JWTs
        res.json({"success": `User ${foundUser.username} is logged in`});
    }
    else{
        res.sendStatus(401);
    }
}

module.exports = {handleLogin};