const express = require('express');
const fileUpload = require('express-fileupload');
const apiRoutes = require('./api-routes');

const app = express();
const port = process.env.PORT; // env var for railway.app

app.use(fileUpload());
app.use(express.json());

app.use('/api', apiRoutes);
app.use('/', express.static('./public'));


app.listen(port, () => {
  console.log(`Listening at http://0.0.0.0:${port}`) // host 0.0.0.0 for railway.app
})
