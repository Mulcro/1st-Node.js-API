const verifyRoles = (...allowedRoles) => {
    return (req,res,next) => {
        if (!req?.roles) return res.sendStatus(401);
        const authorizaedRoles = [...allowedRoles];
        const result = req.roles.map(role => authorizaedRoles.includes(role)).find(val => val === true);
        if (!result) res.sendStatus(401);
        next();
    }

}

module.exports = verifyRoles;