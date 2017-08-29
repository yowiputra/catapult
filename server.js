const express       = require("express");
const bodyParser    = require("body-parser");

const getLaunchData = require("./utils/getLaunchData.js");

const port          = process.env.PORT || 8080;
const refreshRate   = 900000; //15 minutes
const launchURL     = "https://launchlibrary.net/1.2/launch/next/50";

// Server setup
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// In-memory storage
let launchData = {};

// Caching function
function queryAndCacheData(url){
  return getLaunchData(url)
    .then((result) => {
      console.log("setting cache...");
      launchData = result;
    });
}

// Routes
app.get("/", (req, res, next) => {
  res.render("index", launchData);
})

queryAndCacheData(launchURL)
  .then(() => {
    app.listen(port, () => {
      console.log(`catapult listening on port ${port}!`);
      // refresh cache at an arbitrary rate
      setInterval(queryAndCacheData.bind(null, launchURL), refreshRate);
    });
  });
