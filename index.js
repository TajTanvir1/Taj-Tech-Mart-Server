const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
   origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://taj-tech-mart.web.app",
      "https://taj-tech-mart.firebaseapp.com"
    ],
    credentials: true,
}));
app.use(express.json());



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.g5peoxj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const productsCollection = client.db('techMart').collection('products')


// Get products
app.get('/products', async (req,res)=>{
  const cursor = productsCollection.find();
  const result = await cursor.toArray();
  res.send(result);
})

// Get products by search
app.get('/product', async (req,res)=>{
  const search = req.query.search
  let product = {
     productName: { $regex: `${search}`, $options: 'i' },
   }
  const cursor = productsCollection.find(product);
  const result = await cursor.toArray();
  res.send(result);
})

app.get('/productCount', async (req, res)=>{
  const count = await productsCollection.estimatedDocumentCount();
  res.send({ count });
})





    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
   //  await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res)=>{
   res.send('Taj Tech Mart Server is Running')
})

app.listen(port, ()=>{
   console.log(`Taj Tech Mart Server is Running on ${port}`)
})
