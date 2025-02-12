const express = require('express');
require('dotenv').config();
const cors = require('cors');
const bcrypt = require('bcrypt');

const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const { LocalConvenienceStoreOutlined } = require('@mui/icons-material');

app.use(cors());
app.use(express.json());
// connect to MongoDB

// get URI from the env file.
const uri = process.env.uri;
const saltrounds = 18;

const client = new MongoClient(uri);

async function run() {

  try {
    // connect to server
    await client.connect();

    // confirm connection with a ping
    await client.db("admin").command({ ping: 1 });

    console.log("Pinged you're deployment. You have successfully connected to MongoDB!");
    db = client.db("FocusDev");

  } catch(error){

    console.error("Failed to connect to MongoDB", error);
    
  }
}
  run().catch(console.dir);

  // get QOTD
  app.get('/api/qotd', async (req, res) => {
    try {
      const response = await fetch('https://favqs.com/api/qotd');
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch quote' });
    }
  });

  // signup
  app.post('/signup', async (req, res) => {
    try {

      const {email, password} = req.body;
      const usersCollection = db.collection('users');

      // hash password so we don't store in plaintext
      const hash = await bcrypt.hash(password, saltrounds);

      // insert entered password and email.
      const insertResult = await usersCollection.insertOne({ 

        email: email,
        password: hash,

      });
      console.log(insertResult);
      res.status(200).json('User signed up!');
      console.log(email, "- signed up!");

    } catch (error) {
      res.status(500).json({ error: 'Failed to Sign up' });
      console.log("Failed to sign up", error);
    }
  });

  //login

  app.post('/login', async (req, res) => {
    try {



    } catch (error) {
      res.status(500).json({ error: 'Failed to login' });
    }
  });


  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });