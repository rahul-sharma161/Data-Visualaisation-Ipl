// create a fetchAndVisulation fn(but it only ftcehs objectify and passes param to  actual visulisn fn)
// Fetch data.json->change it to json->pass to visn fn
//		Fetch data.json->change it to json->pass to visn fn
/**Goal part 2 goal-
 1. have drop down of years
 2. have submit button along side
 3. capture the year selected 
 4. listen for sumit btn click
 5. call function with captured year
 6. perform economy fn and visualise data 
 */
//for seleect id "year" in index.html

//1st pblm
function fetchAndVisualizeData() {
  fetch("./data.json")
    .then((r) => r.json())
    .then(visualizeData);
}

fetchAndVisualizeData();

function visualizeData(data) {
  visualizeMatchesPlayedPerYear(data.matchesPlayedPerYear);
  visualizeMatchesWinByTeam(data.matchesWinByTeam);
  visualizeExtraRun_2016(data.extrarun_2016);
  visualizeBestEconomies2015(data.bestEconomies2015);
  visualizeStory_HighestRunGetters(data.story_LeadingScorers);

  //console.log(data.extrarun_2016);
  return;
}

function visualizeMatchesPlayedPerYear(matchesPlayedPerYear) {
  const seriesData = [];
  for (let year in matchesPlayedPerYear) {
    seriesData.push([year, matchesPlayedPerYear[year]]);
  }

  Highcharts.chart("matches-played-per-year", {
    chart: {
      type: "column",
    },
    title: {
      text: "Matches Played Per Year",
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>',
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      min: 0,
      title: {
        text: "Matches",
      },
    },
    series: [
      {
        name: "Years",
        data: seriesData,
      },
    ],
  });
}

//2nd pblm

function visualizeMatchesWinByTeam(matchesWinByTeam) {
  const seriesData = [];
  for (let win in matchesWinByTeam) {
    seriesData.push([win, matchesWinByTeam[win]]);
  }

  Highcharts.chart("matches-played-per-year2", {
    chart: {
      type: "pie",
    },
    title: {
      text: "Matches Won By Each Team Over All The Years Of IPL",
    },
    subtitle: {
      text:
        'Click the slices to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>',
    },

    accessibility: {
      announceNewData: {
        enabled: true,
      },
      point: {
        valueSuffix: "",
      },
    },

    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          format: "{point.name}: {point.y}",
        },
      },
    },

    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat:
        '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> of total<br/>',
    },

    series: [
      {
        name: "Teams",
        colorByPoint: true,

        data: seriesData,
      },
    ],
  });
}

//3rd problem
function visualizeExtraRun_2016(extraRun_2016) {
  //console.log(extraRun_2016);
  const seriesData = [];
  for (let runs in extraRun_2016) {
    seriesData.push([runs, extraRun_2016[runs]]);
  }

  Highcharts.chart("extra-runs", {
    chart: {
      type: "column",
    },
    title: {
      text: "Extra runs per team in 2016",
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>',
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      min: 0,
      title: {
        text: "runs",
      },
    },
    series: [
      {
        name: "Teams",
        data: seriesData,
      },
    ],
  });
}

//4th porblme
function visualizeBestEconomies2015(bestEconomies2015) {
  //console.log(extraRun_2016);
  const seriesData = [];
  for (let econ in bestEconomies2015) {
    seriesData.push([econ, bestEconomies2015[econ]]);
  }

  Highcharts.chart("best-economies", {
    chart: {
      type: "column",
    },
    title: {
      text: "Bowlers with best economy in  IPL 2015",
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>',
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      min: 0,
      title: {
        text: "Economy",
      },
    },
    series: [
      {
        name: "Bowlers",
        data: seriesData,
      },
    ],
  });
}

function visualizeStory_HighestRunGetters(story_LeadingScorers) {
  //console.log(story_LeadingScorers, "story");
  const seriesData = [];
  for (let runs in story_LeadingScorers) {
    seriesData.push([runs, story_LeadingScorers[runs]]);
  }

  Highcharts.chart("highest-scores", {
    chart: {
      type: "column",
    },
    title: {
      text: "Leading run scorers in all of IPL",
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>',
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      min: 0,
      title: {
        text: "Runs",
      },
    },
    series: [
      {
        name: "Batsman",
        data: seriesData,
      },
    ],
  });
}

let year;
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault(); // prevent default action
  var select = this.querySelector("select");
  if (select.value !== "0") {
    year = select.value;
    //location.href = select.value;
  }
  e.preventDefault();
  fetch(`/economy?year=${year}`)
    .then((data) => data.json())
    .then(visualizeData4)
    .catch((e) => console.log("err!", e));
});
function visualizeData4(data) {
  visualizeEconomy(data, year);
}
function visualizeEconomy(data, year) {
  Highcharts.chart("part-2-econ", {
    chart: {
      type: "column",
    },
    title: {
      text: `Top 10 economical bowlers of ${year}`,
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      min: 0,
      title: {
        text: "Economy",
      },
    },
    series: [
      {
        name: "Economy",
        data: data,
      },
    ],
  });
}
