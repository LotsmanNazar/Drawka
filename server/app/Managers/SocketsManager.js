var ObjectsManager = require('./ObjectsManager');

class SocketsManager extends ObjectsManager {
	constructor() {
		super();
	}

	updatePlayers(PlayersManager, players, responseName, data, exclude = [], callback = () => {}) {
		for ( var i in players ) {
			var PlayerObject = ( players[i].constructor.name == 'Player' ) ? players[i] : PlayersManager.get(players[i]);
			var SocketControllerObject = this.get(PlayerObject.getSocketID());

			if ( !SocketControllerObject || exclude.indexOf(PlayerObject.getID()) != -1 ) {
				continue;
			}

			SocketControllerObject.emit(responseName, data);

			callback(PlayerObject);
		}
	}

	disconnectPlayers(PlayersManager, players, exclude = []) {
		for ( var i in players ) {
			var PlayerObject = ( players[i].constructor.name == 'Player' ) ? players[i] : PlayersManager.get(players[i]);
			var SocketControllerObject = this.get(PlayerObject.getSocketID());

			if ( !SocketControllerObject || exclude.indexOf(PlayerObject.getID()) != -1 ) {
				continue;
			}

			SocketControllerObject.disconnect(false);
		}
	}

	updatePlayersEndSelectWord(PlayersManager, players, drawer, dataDrawer, dataPlayer) {
		for ( var i in players ) {
			var PlayerObject = ( players[i].constructor.name == 'Player' ) ? players[i] : PlayersManager.get(players[i]);
			var SocketControllerObject = this.get(PlayerObject.getSocketID());

			if ( !SocketControllerObject ) {
				continue;
			}

			if ( PlayerObject.getID() == drawer ) {
				SocketControllerObject.emit('endSelectWord', dataDrawer);
			} else {
				SocketControllerObject.emit('endSelectWord', dataPlayer);
			}
		}
	}

	updatePlayersStartSelectWord(PlayersManager, players, drawer, dataDrawer, dataPlayer) {
		for ( var i in players ) {
			var PlayerObject = ( players[i].constructor.name == 'Player' ) ? players[i] : PlayersManager.get(players[i]);
			var SocketControllerObject = this.get(PlayerObject.getSocketID());

			if ( !SocketControllerObject ) {
				continue;
			}

			if ( PlayerObject.getID() == drawer ) {
				SocketControllerObject.emit('startSelectWord', dataDrawer);
			} else {
				SocketControllerObject.emit('startSelectWord', dataPlayer);
			}
		}
	}
}

module.exports = SocketsManager;