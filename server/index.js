const express = require('express'); 
const app = express(); 
const cors = require('cors'); 
const jwtAuthRoutes = require("./routes/jwtAuth"); 

const PORT = 4000; 
// middlewares

app.use(cors()); 
app.use(express.json()); 

// routes
app.use("/authentication", jwtAuthRoutes);


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`); 
})