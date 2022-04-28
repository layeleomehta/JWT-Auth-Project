const express = require('express'); 
const app = express(); 
const cors = require('cors'); 

const PORT = 4000; 
// middlewares

app.use(cors()); 
app.use(express.json()); 

// routes

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`); 
})