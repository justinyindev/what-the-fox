const Headline = require("./../models/headline");
const scrapeSummary = require("./../utils/scrapeSummary");

exports.getHeadlines = async (req, res) => {
  try {
    if (req.query.startDateTime && req.query.endDateTime) {
      const startTime = req.query.startDateTime;
      const endTime = req.query.endDateTime;
      const headlines = await Headline.find({
        date: { $gte: startTime, $lte: endTime },
      }).lean();
      res.json(headlines);
    } else {
      const headlines = await Headline.findOne().sort({ date: -1 }).lean();
      res.json([headlines]);
    }
    // TO DO
    // const processedHeadlines = await Promise.all(headlines.map(async (headline) => {
    //   const summary = await scrapeSummary(headline.url);
    //   return {
    //     ...headline,
    //     summary
    //   };
    // }));
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
