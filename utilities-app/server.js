const express = require('express');
const session = require('express-session');

require('dotenv').config();
const cors = require('cors');
const bcrypt = require('bcrypt');

const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
let db;

const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(session({
  secret: process.env.secretsession,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// get URI from the env file.
const uri = process.env.uri;
const saltrounds = 10;

const client = new MongoClient(uri);

async function run() {

  try {
    // connect to server
    await client.connect();

    // confirm connection with a ping
    await client.db("admin").command({ ping: 1 });

    console.log("Pinged you're deployment. You have successfully connected to MongoDB!");
    db = client.db("FocusDev");

  } catch (error) {

    console.error("Failed to connect to MongoDB", error);

  }
}
run().catch(console.dir);

// get QOTD
app.get('/api/qotd', async (req, res) => {
  try {
    const response = await fetch('https://zenquotes.io/api/today');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quote' });
  }
});

app.post('/api/githubUsername', async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    req.session.githubUsername = username;

    console.log(`Username set to ${username}`);
    res.status(200).json({ message: 'Username retrieved successfully' });
    console.log("Username retrieved successfully");

  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve username' });
  }
});

// get user data from the github API
// this will be used to display user data on the frontend
app.get('/api/githubApiConn', async (req, res) => {

  try {
    const username = req.session.githubUsername || 'defaultUsername';
    console.log("Fetching repos for username:", username);

    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    console.log("Connected to the Github API!");
    const data = await response.json();

    res.json(data);

  } catch (error) {
    res.status(500).json({ error: 'Failed to get user data from Github API' });
  }
});

// get status of the user. are they logged in or not?
// this can then be sent to the frontend, enabling me to effect elements there.
app.get('/auth/status', async (req, res) => {
  if (req.session.user) {
    console.log("Session:", req.session);  // Debugging session
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
});

// signup
app.post('/signup', async (req, res) => {
  try {

    const { email, password } = req.body;
    const usersCollection = db.collection('users');

    const existingUser = await usersCollection.findOne({ email });

    // checks for existing users - returns an error
    if (existingUser) {

      console.log("Email is already in use, please user an alternitive email address.");
      return res.status(400).json({ message: 'Email is already in use, please use an alternitive email address.' });

    }

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
    const { email, password } = req.body;
    const usersCollection = db.collection('users');
    // make the email field a unique input - important
    await usersCollection.createIndex({ email: 1 }, { unique: true });

    // Check if a user exists with the provided email
    const user = await usersCollection.findOne({ email: email });

    if (!user) {
      // If the user doesn't exist
      console.log("User not found");
      return res.status(400).json({ message: "User not found. This could be because of an incorrect email or password. Please try again." });
    }

    // If user exists, validate the password
    const isValid = await bcrypt.compare(password, user.password);

    if (isValid) {
      // If password is valid, log the user in and store the user in the session
      req.session.user = user;
      console.log(email, "is logged in!");
      return res.status(200).json({ message: "Login successful!" });
    } else {
      // If password is invalid, return an error
      console.log("Incorrect password");
      return res.status(400).json({ message: "Incorrect email or password. Please try again." });
    }

  } catch (error) {
    console.error("Error in login route", error);
    return res.status(500).json({ error: 'Failed to login' });
  }
});

//github contributions API Request 

app.post('/api/githubContributions', async (req, res) => { 

  const { username } = req.body;
 
  if (!username) {
 
   return res.status(400).json({ error: 'Username is required'});
  }
 
  const query = `
     query($userName: String!) {
       user(login: $userName) {
         contributionsCollection {
           contributionCalendar {
             totalContributions
             weeks {
               contributionDays {
                 contributionCount
                 date
               }
             }
           }
         }
       }
     }
   `;
 
   const variables = { userName: username };
 
   try{
 
     // make the graphQL request to the github API
     const response = await fetch('https://api.github.com/graphql', {
 
       method: 'POST',
       headers: {
         'Authorization': `Bearer ${process.env.githubAccessToken}`,  // use the github access token from the env file
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({ query, variables }),
 
     });
 
     // await response
     const contributionData = await response.json();
 
     if( contributionData.errors) {
 
       return res.status(500).json({error: contributionData.errors});
     }
 
     res.json(contributionData.data.user.contributionsCollection.contributionCalendar);
     console.log("Fetched contributions successfully!");
     
   }
   catch(error){
 
     console.error("Error fetching contributions:", error);
     return res.status(500).json({ error: 'Failed to fetch contributions' });
   }
 
 });

// logout route
app.post('/logout', async (req, res) => {

  req.session.destroy((err) => {

    if (err) {

      console.log("Error logging out user", err);
      res.status(500).json({ message: "Error logging out user" });

    }
    else {

      console.log("User logged out");
      res.status(200).json({ message: "User logged out" });
    }
  });
});

app.post('/delete', async (req, res) => {

  const {email, password} = req.body;
  const usersCollection = db.collection('users');

  try {
  // find user
  const user = await usersCollection.findOne({ email });

  if(!user){
    return res.status(400).json({ message: "User not found" });
  }

  // do a password check
  const isValid = await bcrypt.compare(password, user.password);

  if(!isValid){
    return res.status(400).json({message: "incorrect Password" });
  }

  // delete the user
  await usersCollection.deleteOne({ email });

  } catch(err){
    return res.status(500).json({ message: "Error deleting user" });
  }
  
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});