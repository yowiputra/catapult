const fetch      = require("node-fetch");

module.exports = (url) => {
  return new Promise ((resolve, reject) => {
    console.log("fetch from api");
    fetch(url)
    .then(res => res.json())
    .then(results => {
      const templateVars = {
        data: results.launches,
      }
      resolve(templateVars);
    })
    .catch(err => {
      reject(err);
    });
  })
}
