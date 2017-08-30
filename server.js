const express       = require("express");
const bodyParser    = require("body-parser");

// The promise that fetches the data from api is separated for modularity
const getLaunchData = require("./utils/getLaunchData.js");

const port          = process.env.PORT || 8080;
const refreshRate   = 900000; //15 minutes

// Server setup
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// In-memory storage
let launchData = {};

// Utilized promises for fetching api data and storing it as cache
function queryAndCacheData(){
  return getLaunchData()
    .then((result) => {
      console.log("setting cache...");
      launchData = result;
    });
}

// Routes
app.get("/", (req, res, next) => {
  res.render("index", launchData);
})

// Get launchData during server startup, then listen to port
queryAndCacheData()
  .then(() => {
    app.listen(port, () => {
      console.log(`catapult listening on port ${port}!`);
      // refresh cache at an arbitrary rate
      setInterval(queryAndCacheData, refreshRate);
    });
  });
