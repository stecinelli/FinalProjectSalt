const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs')
const unirest = require('unirest');

const app = express();
const port = 8080;


app.use(fileUpload());
app.use('/sounds', express.static('./files'));

app.get('/cat/', (req, res) => {
  const request = unirest('GET', 'https://cataas.com/cat?json=true');
  request.end(function (response) {
    if (response.error) throw new Error(response.error);
    res.json(response.body || {});
  });
});

app.get('/sounds', (req, res) => {
  // listar conteudo da pasta
  const files = fs.readdirSync(path.join(__dirname, 'files'));
  // transformar nome do arquivo em title e url
  const result = files.map(file => {
    return {
      title: file.split('.')[0].charAt(0).toUpperCase() + file.split('.')[0].slice(1),
      url: `http://localhost:8080/sounds/${file}`,
    };
  });
  // responder json com lista de obj
  res.json(result);
});

app.post('/sounds', (req, res) => {
  const upfile = req.files.sound;
  const updest = path.join(__dirname, 'files', upfile.name);

  upfile.mv(updest, err => {
    if (err) { return res.status(500).send(err); }

    res
      .status(201)
      .send();
  });
});

app.get('/mob', (req, res) => {

})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
