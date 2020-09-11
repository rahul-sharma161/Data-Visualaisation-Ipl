/*
 *players with best batting averages
 */
function story_LeadingScorers(deliveries) {
  result = {};
  for (let item of deliveries) {
    result[item.batsman] =
      result[item.batsman] + +item.batsman_runs || +item.batsman_runs;
  }

  var arr = Object.entries(result);

  arr.sort((a, b) => b[1] - a[1]);
  arr = arr.splice(0, 10);
  var obj = Object.fromEntries(arr);
  return obj;
}
module.exports = story_LeadingScorers;
