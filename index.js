const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
   origin: [
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    credentials: true,
}));
app.use(express.json());



app.get('/', (req, res)=>{
   res.send('Taj Tech Mart Server is Running')
})

app.listen(port, ()=>{
   console.log(`Taj Tech Mart Server is Running on ${port}`)
})