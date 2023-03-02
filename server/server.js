const express = require("express");
const puppeteer = require("puppeteer");
const mongoose = require("mongoose");
const Headline = require("./models/headline");
const PORT = process.env.PORT || 3001;
require("dotenv").config();

// Connect to the MongoDB database
mongoose.connect(process.env.MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create an instance of the Express application
const app = express();

const scrapeSummary = async (headline) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(headline.url);

  // Wait for the <div> element with class c-entry-content to be loaded
  await page.waitForSelector(".c-entry-content");

  // Get the content of the <div> element with class c-entry-content
  const articleContent = await page.evaluate(() => {
    // Get all of the <p> and <h3> tags under the <div> element with class c-entry-content
    const paragraphs = [
      ...document.querySelectorAll(".c-entry-content p, .c-entry-content h3"),
    ];

    // Filter out any elements with class name = c-article-footer
    const filteredParagraphs = paragraphs.filter(
      (p) => !p.closest(".c-article-footer")
    );

    // Join the text content of the paragraphs with a newline character
    const content = filteredParagraphs.map((p) => p.textContent).join("\n");

    return content;
  });

  console.log(articleContent);

  return articleContent;
};

// Define an endpoint for retrieving headlines from the database within a specified date range
app.get("/api/headlines", async (req, res) => {
  try {
    const startTime = req.query.startDateTime
      ? req.query.startDateTime
      : new Date().setHours(0, 0, 0, 0);
    const endTime = req.query.endDateTime
      ? req.query.endDateTime
      : new Date().setHours(23, 59, 59, 999);

    const headlines = await Headline.find({
      date: { $gte: startTime, $lte: endTime },
    }).lean();

    res.json(headlines);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
