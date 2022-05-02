const jwt = require("jsonwebtoken"); 
require("dotenv").config(); 

module.exports = (req, res, next) => {

    const token = req.header("token"); 

    if(!token){
        return res.status(403).json({ msg: "authorization denied" });
    }

    try {
        const verify = jwt.verify(token, process.env.jwt_secret);
        req.user = verify.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token is not valid" });        
    }

}