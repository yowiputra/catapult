const express    = require("express");
const bodyParser = require("body-parser");

const getLaunchData = require("./utils/getLaunchData.js");

const port        = process.env.PORT || 8080;
const refreshRate = 900000; //15 minutes
const launchURL   = "https://launchlibrary.net/1.2/launch/next/50";

// Server setup
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// In-memory storage
let launchData = {};

// Functions
function queryData(url){
  getLaunchData(url).then((result) => {
    launchData = result;
  })
}

function cachingLaunchData(url){
  if(!launchData.data){
    queryData(url);
  } else {
    console.log("fetch from cache");
  }
}

// Routes
app.get("/", (req, res, next) => {
  // redundancy in case data doesn't load during server startup
  cachingLaunchData(launchURL);
  res.render("index", launchData);
})

app.listen(port, () => {
  // Cache data in memory during initial server startup and refresh once every
  // arbitrary amount of time
  cachingLaunchData(launchURL);
  setInterval(queryData.bind(null, launchURL), refreshRate);
  console.log(`Example app listening on port ${port}!`);
});
