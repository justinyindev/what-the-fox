const express = require("express");
const mongoose = require("mongoose");
const Headline = require("./models/headline");
const PORT = process.env.PORT || 3001;
require('dotenv').config()

// Connect to the MongoDB database
mongoose.connect(process.env.MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create an instance of the Express application
const app = express();

app.get('/', async (req, res) => {
  console.log("What the vox!");
  res.send("What the vox!")
})
// Define an endpoint for retrieving headlines from the database
app.get('/api/headlines', async (req, res) => {
  try {
    const headlines = await Headline.find().lean();
    res.json(headlines);
    console.log(res)
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

