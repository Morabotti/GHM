import * as moment from 'moment'

import { GameState } from '../types'
import { analyzeEvents } from './GameEvents'
import { dispatchSocket, openSockets } from '../handler/SocketIo'
import gameStats from './GameStats'
import matchCore from './MatchCore'

import config from '../config'

class GameEvents {
  gameState?: GameState
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
      this.dispatchBomb(state.bomb)
      
      this.gameState = state
      return
    }

    // * UPDATE SECTION => ONLY UPDATES WHEN THERE IS CHANGE => ALWAYS USEFUL * //
    if (state.previously !== undefined) {
      if (state.previously.allplayers !== undefined) {
        this.setVectors(state)
        analyzeEvents(state)
        matchCore.testTeamSides(state.allplayers)

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

      if (state.previously.bomb !== undefined) {
        this.dispatchBomb(state.bomb)
        this.gameState = {
          ...this.gameState,
          bomb: state.bomb
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
      gameStats.checkIfUpdated(state)
    }
  }

  validateData(state: GameState) {
    return state.auth.token === config.gameStateToken
  }

  analyzeCurrentState(state: GameState) {
    if(state.map !== undefined && this.isClientOnline) {
      if(!this.isGameOnline) {
        this.isGameOnline = true
        this.dispatchStatus()
      }
    } else {
      if (this.isGameOnline) {
        this.isGameOnline = false
        this.dispatchStatus()
      }
    }

    if(this.isClientOnline && this.isGameOnline) {
      if(state.allplayers !== undefined && state.phase_countdowns !== undefined) {
        if(!this.isClientSpectating) {
          this.isClientSpectating = true
          this.dispatchStatus()
          this.sendCurrentDispatch(state)
        }
      } else {
        if(this.isClientSpectating) {
          this.isClientSpectating = false
          this.dispatchStatus()
        }
      }
    } 
  }

  checkOfflineStatus() {
    const currentMoment = moment().unix()
    if (this.isNotFirstTime && currentMoment - this.latestTime > config.gameStateTimeout ) {
      this.isClientOnline = false
      this.isGameOnline = false
      this.isClientSpectating = false
    }
  }

  setVectors(state: GameState): GameState {
    if(state.allplayers !== undefined) {
      Object.keys(state.allplayers).map(key => {
        const { position, forward } = state.allplayers[key]
        state.allplayers[key] = {
          ...state.allplayers[key],
          position: position.split(', '),
          forward: forward.split(', '),
          watching: false
        }
      })
    }
    return state
  }

  checkIfHasData() {
    return this.gameState === undefined ? false : true
  }

  sendCurrentDispatch(state: GameState) {
    this.dispatchAllPlayers(state.allplayers)
    this.dispatchPlayer(state.player)
    this.dispatchMap(state.map)
    this.dispatchPhase(state.phase_countdowns)
    this.dispatchBomb(state.bomb)
  }

  sendLatestDispatch() {
    this.dispatchAllPlayers()
    this.dispatchPlayer()
    this.dispatchMap()
    this.dispatchPhase()
    this.dispatchBomb()
  }

  dispatchAllPlayers(data = null) {
    if (data === null) {
      if (this.gameState)
        if (this.gameState.allplayers !== undefined)
          dispatchSocket(
            openSockets.allPlayers,
            'state',
            this.gameState.allplayers
          )
    } else {
      if (data !== undefined) {
        dispatchSocket(
          openSockets.allPlayers,
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
          dispatchSocket(
            openSockets.player,
            'state',
            this.gameState.player
          )
    } else {
      if (data !== undefined) {
        dispatchSocket(
          openSockets.player,
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
          dispatchSocket(
            openSockets.map,
            'state',
            this.gameState.map
          )
    } else {
      if (data !== undefined) {
        dispatchSocket(
          openSockets.map,
          'state',
          data
        )
      }
    }
  }

  dispatchBomb(data = null) {
    if (data === null) {
      if (this.gameState)
        if (this.gameState.bomb !== undefined)
          dispatchSocket(
            openSockets.bomb,
            'state',
            this.gameState.bomb
          )
    } else {
      if (data !== undefined) {
        dispatchSocket(
          openSockets.bomb,
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
          dispatchSocket(
            openSockets.phase,
            'state',
            this.gameState.phase_countdowns
          )
    } else {
      if (data !== undefined) {
        dispatchSocket(
          openSockets.phase,
          'state',
          data
        )
      }
    }
  }

  dispatchStatus(data = null) {
    if (data === null) {
      dispatchSocket(
        openSockets.updates,
        'state',
        this.getCurrentStatus()
      )
    } else {
      if (data !== undefined) {
        dispatchSocket(
          openSockets.updates,
          'state',
          data
        )
      }
    }
  }

  // * SETTERS * //
  setCurrentTime() { this.latestTime = moment().unix() }

  // * GETTERS * //
  getClientOnline() { return this.isClientOnline }
  getGameOnline() { return this.isGameOnline }
  getGameLive() { return this.isGameLive }
  getClientIsSpectating() { return this.isClientSpectating }
  getGameState() { return this.gameState }

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
