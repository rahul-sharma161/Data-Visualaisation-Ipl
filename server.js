const express = require("express");
const app = express();
var cors = require("cors");
const data = require("./public/data.json");

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(index.js);
});
app.get("/economy", (req, res) => {
  let year = Object.values(req.query);
  res.json(data["part2_bestEcons"][year]);
});

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.options("*", cors());

app.listen(process.env.PORT || 3000, function () {
  console.log("server running on port 3000", "");
});
