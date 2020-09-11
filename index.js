/**
Plot the total number of matches played each year. (This problem is solved).
Plot the number of matches won by each team over all the years of IPL.
For the year 2016, plot the extra runs conceded by each team.
For the year 2015, plot the top 10 economical bowlers along with their economy rates.
Discuss a "Story" you want to tell with the given data.
 */
const fs = require("fs");
const csv = require("csvtojson");
const matchesPlayedPerYear = require("./ipl/matchesPlayedPerYear");
const matchesWinByTeam = require("./ipl/matchesWinByTeam.js");
const extraRun_2016 = require("./ipl/extraRun_2016.js");
const bestEconomies2015 = require("./ipl/bestEconomies2015.js");
const story_LeadingScorers = require("./ipl/story_LeadingScorers.js");
const part2_bestEcons = require("./ipl/part2_bestEcons.js");

const DELEVERIES_FILE_PATH = "./csv_data/deliveries.csv";
const MATCHES_FILE_PATH = "./csv_data/matches.csv";
const JSON_OUTPUT_FILE_PATH = "./public/data.json";

function main() {
  csv()
    .fromFile(MATCHES_FILE_PATH)
    .then((matches) => {
      //console.log(matches);
      let result1 = matchesPlayedPerYear(matches);
      let result2 = matchesWinByTeam(matches);
      csv()
        .fromFile(DELEVERIES_FILE_PATH)
        .then((deleveries) => {
          //console.log(deleveries);
          let result3 = extraRun_2016(deleveries, matches);
          let result4 = bestEconomies2015(deleveries, matches);
          let result5 = story_LeadingScorers(deleveries);
          let result6 = part2_bestEcons(deleveries, matches);

          saveMatches(result1, result2, result3, result4, result5, result6);
        });
    });

  function saveMatches(result1, result2, result3, result4, result5, result6) {
    const jsonData = {
      matchesPlayedPerYear: result1,
      matchesWinByTeam: result2,
      extrarun_2016: result3,
      bestEconomies2015: result4,
      story_LeadingScorers: result5,
      part2_bestEcons: result6,
    };
    const jsonString = JSON.stringify(jsonData);
    fs.writeFile(JSON_OUTPUT_FILE_PATH, jsonString, "utf8", (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
}

main();
