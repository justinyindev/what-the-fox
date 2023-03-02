const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT || 3001;


// Connect to the MongoDB database
mongoose.connect(process.env.MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create an instance of the Express application
const app = express();

const headlineRoutes = require("./routes/headlineRoutes");
app.use("/api", headlineRoutes);

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
