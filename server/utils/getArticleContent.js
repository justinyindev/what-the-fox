const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const NodeCache = require("node-cache");
const cache = new NodeCache();

const getArticleContent = async (url) => {
  const cacheRes = cache.get(url);
  if (cacheRes) {
    return cacheRes;
  }

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
  );

  await page.goto(url);

  const htmlContent = await page.content();
  const $ = cheerio.load(htmlContent);

  // Get the content of the <div> element with class c-entry-content
  const articleContent = $(".c-entry-content")
    .find("p,h3")
    .filter((i, el) => !$(el).closest(".c-article-footer").length)
    .map((i, el) => $(el).text())
    .get()
    .join("\n");

  await page.close();
  await browser.close();

  cache.set(url, articleContent);

  return articleContent;
};

module.exports = getArticleContent;
