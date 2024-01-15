class RequestHandler {
	constructor(data, ServicesLocator) {
		this.ServicesLocator = ServicesLocator;
		this.Player;
		this.Room;
		this.data = data;

		this.defineObjects();
	}

	defineObjects() {
		if ( this.data.playerID && this.data.secretCode ) {
			var PlayerObject = this.ServicesLocator.get('PlayersManager').get(this.data.playerID);
			if ( PlayerObject.getSecretCode() === this.data.secretCode ) {
				this.Player = PlayerObject;
			}
		}

		if ( this.data.roomID ) {
			var RoomObject = this.ServicesLocator.get('RoomsManager').get(this.data.roomID);
			if ( this.isPlayer() && RoomObject !== undefined && RoomObject.playerInRoom(this.Player) ) {
				this.Room = RoomObject;
			}
		}
	}

	isPlayer() {
		if ( this.Player !== undefined ) {
			return true;
		} else {
			return false;
		}
	}

	isRoom() {
		if ( this.Room !== undefined ) {
			return true;
		} else {
			return false;
		}
	}

	playerDefined(compare, message = '') {
		if ( this.isPlayer() !== compare ) {
			return {
				emit: true,
				disconnect: true,
				data: {
					error: true,
					message: message
				}
			}
		}

		return false;
	}

	roomDefined(compare, message = '') {
		if ( this.isRoom() !== compare ) {
			return {
				emit: true,
				disconnect: true,
				data: {
					error: true,
					message: message
				}
			}
		}

		return false;
	}

	handle() {

	}
}

module.exports = RequestHandler;