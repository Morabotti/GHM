const io = require('socket.io').listen(8081);

module.exports = GlobalVariables

function GlobalVariables () {
  this.latestData = null;
  this.clientIsInGame = false;
  this.isGameLive = false;
  this.allRoudData = [];
  this.roundEndData = null;

  this.setLatestData = function ( data ) {
    if(this.clientIsInGame &&
      data.map.phase === 'live' &&
      data.phase_countdowns !== undefined) {

      if(!this.isGameLive && data.map.round === 0) {
        this.initAllRoundData( data );
        return;
      }

      if(this.latestData.phase_countdowns.phase === 'over' &&
        data.phase_countdowns.phase === 'freezetime' &&
        this.roundEndData !== null) {
        this.setAllRoundData(this.roundEndData);
        this.roundEndData = null;
      }

      if(data.phase_countdowns.phase !== 'over'){return}
      
      let allPlayers = [];
      const playerData = data.allplayers;
        
      Object.keys(playerData).forEach((key, index) => {
        const user = playerData[key];
        allPlayers.push({
          index: index,
          key: key,
          name: user.name,
          team: user.team,
          currentRound: {
            money: user.state.money,
            kills: user.state.round_kills,
            kills_hs: user.state.round_killhs,
            total_dmg: user.state.round_totaldmg,
          },
          matchStats: {
            kills: user.match_stats.kills,
            assists: user.match_stats.assists,
            deaths: user.match_stats.deaths,
            mvps: user.match_stats.mvps,
            score: user.match_stats.score,
          }
        })
      })

      const sentData = {
        round: data.map.round,
        rounds_ct: data.map.team_ct.score,
        rounds_t: data.map.team_t.score,
        players: allPlayers
      }
      
      this.roundEndData = sentData;
    }
   
    this.latestData = data
  }

  this.getLatestData = function () { return this.latestData }

  this.getClientConnectionInGame = function () { return this.clientIsInGame }
  this.setClientConnectionInGame = function ( bool ) { this.clientIsInGame = bool } 
  
  this.getAllRoundData = function () { return this.allRoudData }
  this.setAllRoundData = function ( data ) { this.allRoudData.push( data ) } 

  this.checkRoundFromData = function ( num ) { return this.allRoudData.some(e => e.round === num) }

  this.initAllRoundData = function ( data ) {
    this.isGameLive = true;
    let allPlayers = [];
    const playerData = data.allplayers;

    Object.keys(playerData).forEach((key, index) => {
      const user = playerData[key];
      allPlayers.push({
        index: index,
        key: key,
        name: user.name,
        team: user.team,
        currentRound: {
          money: user.state.money,
          kills: user.state.round_kills,
          kills_hs: user.state.round_killhs,
          total_dmg: user.state.round_totaldmg,
        },
        matchStats: {
          kills: user.match_stats.kills,
          assists: user.match_stats.assists,
          deaths: user.match_stats.deaths,
          mvps: user.match_stats.mvps,
          score: user.match_stats.score,
        }
      })
    })

    this.setAllRoundData({
      round: null,
      rounds_ct: null,
      rounds_t: null,
      players: allPlayers
    })
  }
}