const express    = require("express");
const bodyParser = require("body-parser");
const fetch      = require("node-fetch");

const getLaunchData = require("./getLaunchData.js");

const port        = process.env.PORT || 8080;
const refreshRate = 900000; //15 minutes
const launchURL   = "https://launchlibrary.net/1.2/launch/next/50";

// In-memory storage
let launchData = {};

// Server setup
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// Function that runs the promise to update the cache
function cachingLaunchData(url){
  getLaunchData(url).then((result) => {
    launchData = result;
  })
}

// Cache data in memory during initial startup and refresh once every
// arbitrary amount of time
cachingLaunchData(launchURL);
setInterval(cachingLaunchData.bind(null, launchURL), refreshRate);

// Routes
app.get("/", (req, res, next) => {
  res.render("index", launchData);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
