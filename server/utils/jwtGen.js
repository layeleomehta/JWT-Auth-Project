const jwt = require("jsonwebtoken"); 
require("dotenv").config(); 

const JWTGen = (user_id) => {
    const payload = {
        user : user_id
    }; 
    
    return jwt.sign(payload, process.env.jwt_secret, { expiresIn: "1h" }); 
}

module.exports = JWTGen; 