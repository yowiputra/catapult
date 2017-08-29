const fetch = require("node-fetch");

module.exports = (url) => {
  return fetch(url)
    .then(res => res.json())
    .then(({launches}) => {
      console.log("getting data from api...");
      const templateVars = {
        data: launches,
      }
      return templateVars;
    })
}
