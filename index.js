const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});


app.get("/api/:date?", function (req, res) {
  let date = req.params.date;
  let unix = 0;
  let utc = "";
  if (date) {
    if (date.match(/^\d+$/)) {
      unix = parseInt(date);
      utc = new Date(unix).toUTCString();
    } else {
      unix = Date.parse(date);
      utc = new Date(date).toUTCString();
    }
  } else {
    unix = Date.now();
    utc = new Date().toUTCString();
  }
  if (utc === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({ unix: unix, utc: utc });
  }
});

const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
