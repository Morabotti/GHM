const express = require('express');
const router = express.Router()

router.post('/update', (req, res) => {
  console.log(req)
});

router.get('/isonline', (req, res) => {
  console.log("req on: isonline")
});

router.get('/', (req, res) => {
  console.log("req on: api/csgsi")
});

module.exports = router