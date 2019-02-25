const express = require('express');
const path = require('path')
const fallback = require('express-history-api-fallback')
const bodyParser = require('body-parser');

const CSGSI = require('./api/routes/csgsi');

const app = express();

app.use(express.static('../front/build'));
app.use(express.json());

app.use("/api/csgsi", CSGSI);
app.use('/static', express.static(path.join(__dirname, 'static')))

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../front/build/index.html'), function(err) {
    if (err) { res.status(500).send(err) }
  })
})

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log("Listening port: " + PORT)
});