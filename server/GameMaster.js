const fs = require('fs');
const moment = require('moment');
const io = require('socket.io').listen(8081);

//io.of("/socket-overlay").on("connection", function (socket) {
//  console.log("[SOCKET HANDSHAKE - OVERLAY] "+ socket.handshake.address)
//});

const TIMEOUT = 7500;
const SETTINGS_PATH = './static/data/settings.json';

class GameMaster {
  constructor() {
    this.gameData;
    this.isNotFirstTime = false;          //If have gotten even once data
    this.isClientOnline = false;          //Is client on CSGO
    this.isGameOnline = false;            //Is client on server
    this.isGameLive = false;              //Is game live
    this.settings;
    this.latestTime;
  }

  _handleNewData(state) {
    if (this._validateData(state)) {
      this.latestTime = moment().unix();
      this._logCurrentClassState()

      if (!this.isClientOnline){
        this.isNotFirstTime = true;
        this._setClientOnline(true)
      }

      if (state.map !== undefined && this.isClientOnline) {
        if (this.isGameOnline !== true) this._setGameOnline(true)
      } else {
        if (this.isGameOnline !== false) this._setGameOnline(false)
      }

      if(this.isGameOnline) this._handleGameData(state)
    }
  }

  _validateData(state) {
    if (this.settings === null || this.settings === undefined) {
      this._updateSettings();
    }

    if (state.auth.token === this.settings.authKey) {
      return true
    } else {
      return false
    }
  }

  _handleGameData(state) {
    if (this.gameData === undefined) {
      if(state.allplayers !== undefined) {
        Object.keys(state.allplayers).map(key => {
          const { position, forward } = state.allplayers[key]
          state.allplayers[key].position = position.split(', ')
          state.allplayers[key].forward = forward.split(', ')
          state.allplayers[key].watching = false
        })
        io.of('/socket-overlay/allplayers').emit('state', state.allplayers)
      }
      
      if(state.phase_countdowns !== undefined) io.of('/socket-overlay/phase').emit('state', state.phase_countdowns)
      if(state.player !== undefined) io.of('/socket-overlay/player').emit('state', state.player)
      if(state.map !== undefined) io.of('/socket-overlay/map').emit('state', state.map)
      this.gameData = state
      return
    }
    
    // UPDATE SECTION => ONLY UPDATES WHEN THERE IS CHANGE => ALWAYS USEFUL
    if (state.previously !== undefined) {
      if (state.previously.allplayers !== undefined) {
        Object.keys(state.allplayers).map(key => {
          const { position, forward } = state.allplayers[key]
          state.allplayers[key].position = position.split(', ')
          state.allplayers[key].forward = forward.split(', ')
          state.allplayers[key].watching = false
        })
        if (state.player !== undefined && state.player.spectarget !== undefined) state.allplayers[state.player.spectarget].watching = true
        io.of('/socket-overlay/allplayers').emit('state', state.allplayers)
        this.gameData.allplayers = state.allplayers
      }
      if (state.previously.player !== undefined) {
        io.of('/socket-overlay/player').emit('state', state.player)
        this.gameData.player = state.player
      }
      if (state.previously.map !== undefined) {
        io.of('/socket-overlay/map').emit('state', state.map)
        this.gameData.map = state.map
      }
      if (state.previously.phase_countdowns !== undefined){
        io.of('/socket-overlay/phase').emit('state', state.phase_countdowns)
        this.gameData.phase_countdowns = state.phase_countdowns
      }
    }
  }

  _logCurrentClassState() {
    /*
    console.log({
      isNotFirstTime: this.isNotFirstTime,
      isClientOnline: this.isClientOnline,
      isGameOnline: this.isGameOnline,
      isGameLive: this.isGameLive,
      currentSettings: this.settings,
      latestTime: this.latestTime
    })
    */
  }

  _defaultCheckIfOffline() {
    const currentMoment = moment().unix();
    if(this.isNotFirstTime && currentMoment - this.latestTime > 15 ) {
      this._setClientOnline(false);
      this._setGameOnline(false);
    }
  }

  _getCurrentStatus() {
    this._defaultCheckIfOffline();
    return {
      clientOnline: this.isClientOnline,
      gameOnline: this.isGameOnline,
      gameLive: this.isGameLive
    }
  }

  _checkIfHasData() {
    if (this.gameData === undefined) {
      return false
    } else {
      this._sendLatestDispatch()
      return true
    }
  }

  _sendLatestDispatch() {
    if(this.gameData.allplayers !== undefined) io.of('/socket-overlay/allplayers').emit('state', this.gameData.allplayers)
    if(this.gameData.player !== undefined) io.of('/socket-overlay/player').emit('state', this.gameData.player)
    if(this.gameData.map !== undefined) io.of('/socket-overlay/map').emit('state', this.gameData.map)
    if(this.gameData.phase_countdowns !== undefined) io.of('/socket-overlay/phase').emit('state', this.gameData.phase_countdowns)
  }

  _updateSettings() { this.settings = JSON.parse(fs.readFileSync(SETTINGS_PATH, 'utf8')) }
  
  _getClientOnline() { return this.isClientOnline }
  _getGameOnline() { return this.isGameOnline }
  _getGameLive() { return this.isGameLive }
  _getLastestGameData() { return this.gameData }

  _setClientOnline(bool) { this.isClientOnline = bool }
  _setGameOnline(bool) { this.isGameOnline = bool }
  _setGameLive(bool) { this.isGameLive = bool }
}

module.exports = GameMaster;