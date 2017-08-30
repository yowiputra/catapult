const fetch     = require("node-fetch");
const launchURL = "https://launchlibrary.net/1.2/launch/next/50";

// fetches data from api then packages it so that
// index.ejs can utilize the data
module.exports = () => {
  return fetch(launchURL)
    .then(res => res.json())
    .then(({launches}) => {
      console.log("getting data from api...");
      const templateVars = {
        data: launches,
      }
      return templateVars;
    })
}
