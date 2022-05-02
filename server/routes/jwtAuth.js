const express = require("express"); 
const pool = require('../db'); 
const bcrypt = require ('bcrypt');
const router = express.Router();
const JWTGen = require("../utils/jwtGen"); 
const validInfo = require("../middleware/validInfo"); 
const authorize = require("../middleware/authorized"); 


router.post("/register", validInfo, async (req, res) => {
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

        // Step 5: Generate JWT
        const jwtToken = JWTGen(newUser.rows[0].user_id);
        return res.json({ jwtToken });
    } catch (err) {
        console.log(err.message); 
        res.send(err.message); 
        
    }
}); 

router.post("/login", validInfo, async (req, res) => {
    try {
        // Step 1: Get contents of req body
        const {email, password} = req.body;

        // Step 2: Ensure user exists in database
        const existingUser = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]); 
        if(existingUser.rows.length == 0){
            return res.status(401).send("User doesn't exist!"); 
        }

        // Step 3: Compare password to one already in database
        const isValidPassword = await bcrypt.compare(password, existingUser.rows[0].user_password); 

        // Step 4: If passwords match, give the client the JWT
        if(isValidPassword){
            const jwtToken = JWTGen(existingUser.rows[0].user_id);
            return res.json({ jwtToken });
        } else {
            return res.status(401).json("Hmm... this password doesn't match our records. Please try again!");
        }
        
    } catch (err) {
        console.log(err.message); 
        res.send(err.message); 
    }
}); 

router.post("/verify", authorize, (req, res) => {
    try {
      res.json(true);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

module.exports = router; 