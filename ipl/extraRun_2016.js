//filter 2016 matches and form array of match id
//from  deleveries  sel matches matching match id
//find the sum

function extraRun_2016(deliveries, matches) {
  var matches2016id = matches
    .filter((item) => item.season == 2016)
    .reduce((arr, ind) => {
      arr.push(ind.id);
      return arr;
    }, []);

  var deliveries2016 = deliveries.filter((item) =>
    matches2016id.includes(item.match_id)
  );

  result = {};
  for (let item of deliveries2016) {
    result[item.bowling_team] =
      result[item.bowling_team] + parseInt(item.extra_runs) ||
      +parseInt(item.extra_runs);
  }
  return result;
}

module.exports = extraRun_2016;
