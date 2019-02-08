const express = require('express');
const fallback = require('express-history-api-fallback')
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('../front/build'));
app.use(express.json());

app.use(fallback('index.html', { root: __dirname + '../front/build' }))

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log("Listening port: " + PORT)
});