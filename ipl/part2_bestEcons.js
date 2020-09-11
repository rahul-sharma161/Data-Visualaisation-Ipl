function part2_bestEcons(deleveries, matches) {
  //console.log(matches);
  //console.log(deleveries);
  let years = {};
  for (let i = 2008; i < 2020; i++) {
    years[i] = bestEconomies(deleveries, matches, i);
  }
  return years;
}

function bestEconomies(deleveries, matches, year) {
  var matches2015id = matches
    .filter((item) => item.season == year)
    .reduce((arr, ind) => {
      arr.push(ind.id);
      return arr;
    }, []);
  //console.log(matches2015id);
  var deliveries2015 = deleveries.filter((item) =>
    matches2015id.includes(item.match_id)
  );

  result = {};
  balls = {};
  var count = 1;
  for (let item of deliveries2015) {
    result[item.bowler] =
      result[item.bowler] +
        (+item.wide_runs + +item.batsman_runs + +item.noball_runs) ||
      +item.wide_runs + +item.batsman_runs + +item.noball_runs;
  }
  for (let item of deliveries2015) {
    balls[item.bowler] = balls[item.bowler] + 1 || 1;
  }

  var ball = Object.entries(balls);
  //console.log(ball);
  var arr = Object.entries(result);
  //console.log(arr);
  for (let i = 0; i < arr.length; i++) {
    arr[i][1] = +(arr[i][1] / (ball[i][1] / 6)).toFixed(2);
  }
  //console.log(arr.sort());
  arr.sort((a, b) => a[1] - b[1]);
  var arr = arr.slice(0, 10);
  var obj = Object.fromEntries(arr);
  //   console.log(obj);
  return obj;
}

module.exports = part2_bestEcons;
