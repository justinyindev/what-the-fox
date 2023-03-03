const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT || 3001;
const cors = require("cors");

// Connect to the MongoDB database
mongoose.connect(process.env.MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create an instance of the Express application
const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

const headlineRoutes = require("./routes/headlineRoutes");
app.use("/api", headlineRoutes);

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
