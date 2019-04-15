import * as fs from 'fs'
import * as moment from 'moment'
import * as SocketIO from 'socket.io'

import { GameState, Settings } from '../types'
import config from '../config'

const io = SocketIO().listen(config.socketIoPort)

class GameEvents {
  gameState?: GameState
  settings: Settings
  isNotFirstTime: boolean
  isClientOnline: boolean
  isClientSpectating: boolean
  isGameOnline: boolean
  isGameLive: boolean
  latestTime: number

  constructor() {
    this.gameState
    this.isNotFirstTime = false             //If have gotten even once data
    this.isClientOnline = false             //Is client on CSGO
    this.isClientSpectating = false         //Is client spectating
    this.isGameOnline = false               //Is client on server
    this.isGameLive = false                 //Is game on live
    this.settings = this.getSettings()
    this.latestTime = 0                     //Default: 0, doesn't rly matter since code checks this.isNotFirstTime
  }

  handleRequest(state: GameState) {
    if (this.validateData(state)) {
      this.setCurrentTime()

      if (!this.isClientOnline) {
        this.isNotFirstTime = true
        this.isClientOnline = true
      }

      this.analyzeCurrentState(state)

      if (this.isGameOnline)
        this.handleGameState(state)
    }
  }

  handleGameState(state: GameState) {
    if (this.gameState === undefined) {
      if (state.allplayers !== undefined) {
        this.setVectors(state)
        this.dispatchAllPlayers(state.allplayers)
      }

      this.dispatchPhase(state.phase_countdowns)
      this.dispatchPlayer(state.player)
      this.dispatchMap(state.map)
      
      this.gameState = state
      return
    }

    // * UPDATE SECTION => ONLY UPDATES WHEN THERE IS CHANGE => ALWAYS USEFUL * //
    if (state.previously !== undefined) {
      if (state.previously.allplayers !== undefined) {
        this.setVectors(state)

        if (state.player !== undefined && state.player.spectarget !== undefined) {
          state.allplayers[state.player.spectarget].watching = true
        }

        this.dispatchAllPlayers(state.allplayers)
        this.gameState = {
          ...this.gameState,
          allplayers: state.allplayers
        }
      }

      if (state.previously.player !== undefined) {
        this.dispatchPlayer(state.player)
        this.gameState = {
          ...this.gameState,
          player: state.player
        }
      }

      if (state.previously.map !== undefined) {
        this.dispatchMap(state.map)
        this.gameState = {
          ...this.gameState,
          map: state.map
        }
      }

      if (state.previously.phase_countdowns !== undefined) {
        this.dispatchPhase(state.phase_countdowns)
        this.gameState = {
          ...this.gameState,
          phase_countdowns: state.phase_countdowns
        }
      }
    }
  }

  validateData(state: GameState) {
    if (this.settings === null || this.settings === undefined)
      this.setSettings()

    return state.auth.token === this.settings.authKey
  }

  analyzeCurrentState(state: GameState) {
    if (state.map !== undefined && this.isClientOnline) {
      if (this.isGameOnline !== true) this.isGameOnline = true
    } else {
      if (this.isGameOnline !== false) this.isGameOnline = false
    }
  }

  checkOfflineStatus() {
    const currentMoment = moment().unix()
    if (this.isNotFirstTime && currentMoment - this.latestTime > config.gameStateTimeout ) {
      this.isClientOnline = false
      this.isGameOnline = false
    }
  }

  setVectors(state: GameState): GameState {
    Object.keys(state.allplayers).map(key => {
      const { position, forward } = state.allplayers[key]
      state.allplayers[key] = {
        ...state.allplayers[key],
        position: position.split(', '),
        forward: forward.split(', '),
        watching: false
      }
    })
    return state
  }

  checkIfHasData() {
    return this.gameState === undefined ? false : true
  }

  sendLatestDispatch() {
    this.dispatchAllPlayers()
    this.dispatchPlayer()
    this.dispatchMap()
    this.dispatchPhase()
  }

  dispatchAllPlayers(data = null) {
    if (data === null) {
      if (this.gameState)
        if (this.gameState.allplayers !== undefined)
          this.dispatchSocket(
            this.settings.socketPaths.allPlayers,
            'state',
            this.gameState.allplayers
          )
    } else {
      if (data !== undefined) {
        this.dispatchSocket(
          this.settings.socketPaths.allPlayers,
          'state',
          data
        )
      }
    }
  }

  dispatchPlayer(data = null) {
    if (data === null) {
      if (this.gameState)
        if (this.gameState.player !== undefined)
          this.dispatchSocket(
            this.settings.socketPaths.player,
            'state',
            this.gameState.player
          )
    } else {
      if (data !== undefined) {
        this.dispatchSocket(
          this.settings.socketPaths.player,
          'state',
          data
        )
      }
    }
  }

  dispatchMap(data = null) {
    if (data === null) {
      if (this.gameState)
        if (this.gameState.map !== undefined)
          this.dispatchSocket(
            this.settings.socketPaths.map,
            'state',
            this.gameState.map
          )
    } else {
      if (data !== undefined) {
        this.dispatchSocket(
          this.settings.socketPaths.map,
          'state',
          data
        )
      }
    }
  }

  dispatchPhase(data = null) {
    if (data === null) {
      if (this.gameState)
        if (this.gameState.phase_countdowns !== undefined)
          this.dispatchSocket(
            this.settings.socketPaths.phase,
            'state',
            this.gameState.phase_countdowns
          )
    } else {
      if (data !== undefined) {
        this.dispatchSocket(
          this.settings.socketPaths.phase,
          'state',
          data
        )
      }
    }
  }

  dispatchSocket(
    url: string,
    method: string,
    data: any
  ) {
    io.of(url).emit(method, data)
  }

  // * SETTERS * //
  setCurrentTime() { this.latestTime = moment().unix() }
  setSettings() { this.settings = this.getSettings() }

  // * GETTERS * //
  getClientOnline() { return this.isClientOnline }
  getGameOnline() { return this.isGameOnline }
  getGameLive() { return this.isGameLive }
  getClientIsSpectating() { return this.isClientSpectating }
  getGameState() { return this.gameState }

  getSettings() {
    return JSON.parse(fs.readFileSync(config.settingsPath, 'utf8'))
  }

  getCurrentStatus() {
    this.checkOfflineStatus()
    return {
      clientOnline: this.isClientOnline,
      clientSpectating: this.isClientSpectating,
      gameOnline: this.isGameOnline,
      gameLive: this.isGameLive
    }
  }
}

const gameEvents = new GameEvents()

export default gameEvents
