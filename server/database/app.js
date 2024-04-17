const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const  cors = require('cors')
const app = express()
const port = 3030;

app.use(cors())
app.use(require('body-parser').urlencoded({ extended: false }));

const reviews_data = JSON.parse(fs.readFileSync("reviews.json", 'utf8'));
const dealerships_data = JSON.parse(fs.readFileSync("dealerships.json", 'utf8'));

mongoose.connect("mongodb://mongo_db:27017/",{'dbName':'dealershipsDB'});


const Reviews = require('./review');

const Dealerships = require('./dealership');

try {
  Reviews.deleteMany({}).then(()=>{
    Reviews.insertMany(reviews_data['reviews']);
  });
  Dealerships.deleteMany({}).then(()=>{
    Dealerships.insertMany(dealerships_data['dealerships']);
  });
  
} catch (error) {
  res.status(500).json({ error: 'Error fetching documents' });
}


// Express route to home
app.get('/', async (req, res) => {
    res.send("Welcome to the Mongoose API")
});

// Express route to fetch all reviews
app.get('/fetchReviews', async (req, res) => {
  try {
    const documents = await Reviews.find();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

// Express route to fetch reviews by a particular dealer
app.get('/fetchReviews/dealer/:id', async (req, res) => {
  try {
    const documents = await Reviews.find({dealership: req.params.id});
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});




const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const port = 3000;

// Connection URL
const url = 'mongodb://localhost:27017';
const dbName = 'dealershipDB';


app.get('/fetchDealers', async (req, res) => {
    const client = new MongoClient(url);
  
    try {
      await client.connect();
      const db = client.db(dbName);
  
      const dealers = await db.collection('dealers').find({}).toArray();
  
      res.json(dealers);
    } catch (err) {
      console.error('Error fetching dealers:', err);
      res.status(500).send('Internal Server Error');
    } finally {
      await client.close();
    }
  });
  
app.get('/fetchDealers/:state', async (req, res) => {
    const client = new MongoClient(url);
  
    try {
      await client.connect();
      const db = client.db(dbName);
  
      const state = req.params.state;
      const dealers = await db.collection('dealers').find({ state: state }).toArray();
  
      res.json(dealers);
    } catch (err) {
      console.error('Error fetching dealers by state:', err);
      res.status(500).send('Internal Server Error');
    } finally {
      await client.close();
    }
  });
  
app.get('/fetchDealer/:id', async (req, res) => {
    const client = new MongoClient(url);
  
    try {
      await client.connect();
      const db = client.db(dbName);
  
      const id = req.params.id;
      const dealer = await db.collection('dealers').findOne({ _id: new ObjectId(id) });
  
      if (!dealer) {
        return res.status(404).send('Dealer not found');
      }
  
      res.json(dealer);
    } catch (err) {
      console.error('Error fetching dealer by ID:', err);
      res.status(500).send('Internal Server Error');
    } finally {
      await client.close();
    }
  });
  
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });



//Express route to insert review
app.post('/insert_review', express.raw({ type: '*/*' }), async (req, res) => {
  data = JSON.parse(req.body);
  const documents = await Reviews.find().sort( { id: -1 } )
  let new_id = documents[0]['id']+1

  const review = new Reviews({
		"id": new_id,
		"name": data['name'],
		"dealership": data['dealership'],
		"review": data['review'],
		"purchase": data['purchase'],
		"purchase_date": data['purchase_date'],
		"car_make": data['car_make'],
		"car_model": data['car_model'],
		"car_year": data['car_year'],
	});

  try {
    const savedReview = await review.save();
    res.json(savedReview);
  } catch (error) {
		console.log(error);
    res.status(500).json({ error: 'Error inserting review' });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
