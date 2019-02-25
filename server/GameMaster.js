const fs = require('fs');
const moment = require('moment');

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
    this.gameData = state;
  }

  _logCurrentClassState() {
    console.log({
    isNotFirstTime: this.isNotFirstTime,
    isClientOnline: this.isClientOnline,
    isGameOnline: this.isGameOnline,
    isGameLive: this.isGameLive,
    currentSettings: this.settings,
    latestTime: this.latestTime
  }) }
  

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