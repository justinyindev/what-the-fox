const express = require("express");
const app = express();
const puppeteer = require("puppeteer");
const mongoose = require("mongoose");
const config = require("./config");
const Headline = require("./models/headline");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.listen(3000, () => {
//   console.log("Server listening on port 3000!");
// });

scrapeFoxNewsHeadlines = async () => {
  try {
    // Scrape Fox News website for headlines
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto("https://www.vox.com");

    // Find the top news headline and link
    const result = await page.evaluate(() => {
      const headlineEl = document.querySelector(
        "h2.c-entry-box--compact__title a"
      );
      return {
        headline: headlineEl.textContent.trim(),
        link: headlineEl.href
      };
    });

    // Scroll to the article image and headline
    await page.evaluate(() => {
      const imageEl = document.querySelector(
        "div.c-newspaper__column div a img"
      );
      if(imageEl){
        imageEl.scrollIntoView();
      }
    });
    // Wait for the image and headline to finish loading
    await page.waitForSelector("div.c-newspaper__column div a img");
    await page.waitForSelector("h2.c-entry-box--compact__title a");

    // Take a screenshot of the article and headline
    const screenshot = await page.screenshot({
      type: "jpeg",
      quality: 60,
      encoding: "base64",
    });

    const headline = new Headline({
      title: result.headline,
      url: result.link,
      date: new Date(),
      image: screenshot,
    });
    await browser.close();

    // Save headlines to MongoDB Atlas database
    await mongoose.connect(config.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await headline
      .save()
      .then(() => console.log("headline saved to db"))
      .catch((err) => console.log(err));

    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
};

scrapeFoxNewsHeadlines();
