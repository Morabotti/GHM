module.exports = GlobalVariables

function GlobalVariables () {
  this.latestData = null;
  this.clientIsInGame = false;

  this.setLatestData = function ( data ) { this.latestData = data }
  this.getLatestData = function () { return this.latestData }

  this.getClientConnectionInGame = function () { return this.clientIsInGame }
  this.setClientConnectionInGame = function ( bool ) { this.clientIsInGame = bool } 
}