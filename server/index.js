const express = require('express')
const app = express()
const port = 8080
const unirest = require("unirest");

app.get('/cat/', (req, res) => {
  const request = unirest("GET", "https://cataas.com/cat?json=true");
  request.end(function (response) {
    if (response.error) throw new Error(response.error);
    res.json(response.body || {});
  });


})


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})