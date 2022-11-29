const express = require('express');
const fileUpload = require('express-fileupload');
const apiRoutes = require('./api-routes');

const app = express();
const port = 8080;

app.use(fileUpload());
app.use(express.json());

app.use('/api', apiRoutes);
app.use('/', express.static('./public'));


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
