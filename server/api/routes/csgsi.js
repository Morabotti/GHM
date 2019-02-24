const express = require('express');
const GSIController = require('../../variables');
const moment = require('moment');
const router = express.Router();

const Controller = new GSIController();
const AuthKey = process.env.AUTHKEY || 'SecretKEY'

router.post('/update', (req, res) => {
  const data = req.body;
  if(data === null ) { res.sendStatus(401); return}
  const activity = data.player.activity;
  const authToken = data.auth.token;
  if(authToken !== AuthKey) {res.sendStatus(401); return}

  if(activity === 'playing' || activity === 'textinput') { Controller.setClientConnectionInGame(true); } 
  else { Controller.setClientConnectionInGame(false); }
  Controller.setLatestData(data);
  res.sendStatus(200);
});

router.get('/isonline', (req, res) => {
  const data = Controller.getLatestData();
  if(data === null) { res.send([false, false]); return}
  const connectedToServer = Controller.getClientConnectionInGame();
  const latestTimestamp = data.provider.timestamp;
  const currentTimestamp = moment().unix()
  const delay = currentTimestamp - latestTimestamp;
  
  if(delay > 8) { res.send([false, false]) } 
  else { res.send([true, connectedToServer]) }
});

router.get('/', (req, res) => {
  const data = Controller.getLatestData();
  res.send(data);
});

module.exports = router