const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());


// connect to MongoDB

uri ='mongodb+srv://dsteele1906:oUgzWxyF5IJsOmj3@cluster0.mdyby.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri);

async function run() {

  try {
    // connect to server
    await client.connect();

    // confirm connection with a ping
    await client.db("admin").command({ ping: 1 });

    console.log("Pinged you're deployment. You have successfully connected to MongoDB!");
  } finally {
    // closes connection when finish or error
    await client.close();
  }
}
  run().catch(console.dir);

  // get QOTD
  app.get('/signup', async (req, res) => {
    try {
      const response = await fetch('https://favqs.com/api/qotd');
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch quote' });
    }
  });


  // signup
  app.get('/signup', async (req, res) => {
    try {
      const response = await fetch('');
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to Sign up' });
    }
  });

  //login

  app.get('/login', async (req, res) => {
    try {

      
    } catch (error) {
      res.status(500).json({ error: 'Failed to login' });
    }
  });


  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });