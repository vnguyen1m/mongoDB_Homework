var axios = require("axios");
var cheerio = require("cheerio");

var scrape = function() {
  return axios.get("https://timesofindia.indiatimes.com/").then(function(res) {
    var $ = cheerio.load(res.data);
    var articles = [];

    $(".top-story").each(function(i, element) {
      var head = $(this)
        .children(".top-stories")
        .text()
        .trim();

      var url = $(this)
        .children(".top-stories")
        .children("a")
        .attr("href");
      var sum = $(this)
        .children(".hd1")
        .text()
        .trim();

      if (head && sum && url) {
        var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();


        var dataToAdd = {
          headline: headNeat,
          summary: sumNeat,
          url: url
        };

        articles.push(dataToAdd);
      }
    });
    return articles;
  });
};

module.exports = scrape;
