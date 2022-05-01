const express = require("express"); 
const pool = require('../db'); 
const bcrypt = require ('bcrypt');
const router = express.Router();


router.post("/register", async (req, res) => {
    try {
        // Step 1: Get the contents of the request body
        const {username, email, password} = req.body; 

        // Step 2: Verify that there are no duplicate users
        const userQuery = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]); 
        const usersWithSameEmail = await userQuery.rows; 
        if(usersWithSameEmail.length >= 1){
            return res.status(401).json("User already exists!"); 
        }

        // Step 3: Hash the password with bcrypt
        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(password, salt);

        // Step 4: Insert the new user into db
        let newUser = await pool.query( "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
        [username, email, bcryptPassword]); 

        console.log("New user inserted into db!", newUser); 

        // Step 5: Generate JWT
        return res.send("Okie dokie")
    } catch (err) {
        console.log(err.message); 
        res.send(err.message); 
        
    }
}); 

module.exports = router; 