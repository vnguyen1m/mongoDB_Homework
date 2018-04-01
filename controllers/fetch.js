var db = require("../models");
var scrape = require("../scripts/scrape");

module.exports = {
  scrapeHeadlines: function(req, res) {
    // scrape the NYT
    return scrape()
      .then(function(articles) {
        return db.Headline.create(articles);
      })
      .then(function(dbHeadline) {
        if (dbHeadline.length === 0) {
          res.json({
            message: "Check back again. We'll have more cool articles"
          });
        }
        else {
          res.json({
            message: "Check out: " + dbHeadline.length
          });
        }
      })
      .catch(function(err) {
        res.json({
          message: "Yay!!"
        });
      });
  }
};
