const express    = require("express");
const bodyParser = require("body-parser");
const fetch      = require("node-fetch");

const port       = process.env.PORT || 8080;
const launchURL  = "https://launchlibrary.net/1.2/launch/next/50";

const app = express();
app.set("view engine", "ejs");

// Middlewares
app.use(bodyParser.urlencoded({extended: true}));

// Routes
app.get("/", (req, res, next) => {
  fetch(launchURL)
  .then(res => res.json())
  .then(results => {
    const templateVars = {
      data: results.launches,
      count: results.count
    }
    res.render("index", templateVars);
  })
  .catch(err => {
    console.log(err);
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
