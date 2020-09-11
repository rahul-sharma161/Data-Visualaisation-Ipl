function matchesWinByTeam(matches) {
  //new obj->obj[season]=obj[season]+1||1
  //const match = Object.stringify(matches);
  const obj = {};
  for (let i of matches) {
    if (!i.winner) {
      i.winner = "No Result";
      obj[i.winner] = obj[i.winner] + 1 || 1;
    } else {
      obj[i.winner] = obj[i.winner] + 1 || 1;
    }
  }
  return obj;
}
module.exports = matchesWinByTeam;
