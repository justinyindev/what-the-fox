const Headline = require("./../models/headline");
const getArticleContentMulti = require("../utils/getArticleContent");
const summarizeContent = require("../utils/summarizeContent");

exports.getHeadlines = async (req, res) => {
  try {
    if (req.query.startDateTime && req.query.endDateTime) {
      const startTime = req.query.startDateTime;
      const endTime = req.query.endDateTime;
      const headlines = await Headline.find({
        date: { $gte: startTime, $lte: endTime },
      }).sort({date: -1}).lean();

      res.json(headlines);
    } else {
      const headline = await Headline.findOne().sort({ date: -1 }).lean();
      res.json([headline]);
    }
    // TO DO
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getSummary = async (req, res) => {
  try {
    const url = req.query.url;
    const articleContent = await getArticleContentMulti(url);
    const summarizedContent = summarizeContent(articleContent);

    res.json({ summary: summarizedContent });
  } catch (error) {
    console.error(error);
  }
};
