var RequestHandler = require('./RequestHandler');

class UserEnterRequest extends RequestHandler {
	constructor(data, ServicesLocator) {
		super(data, ServicesLocator);
	}

	validate() {
		if ( this.data.nickname === undefined || ( this.data.nickname.length < 3 || this.data.nickname.length > 12 ) ) {
			return false;
		}

		this.data.nickname = this.data.nickname.replaceAll('<', '').replaceAll('>', '');

		return true;
	}

	handle() {
		if ( !this.validate() ) {
			return {
				emit: true,
				disconnect: true,
				data: {
					error: true,
					wrongNickname: true,
					message: 'Nickname consists of the wrong number of characters.'
				}
			}
		}

		if ( this.ServicesLocator.get('PlayersManager').getCount() == settings.maxPlayers ) {
			return {
				emit: true,
				disconnect: true,
				data: {
					error: true,
					message: 'The server is full, please try later.'
				}
			}
		}

		var PlayerObject = this.ServicesLocator.get('ObjectsCreator').player(this.data);
		this.ServicesLocator.get('PlayersManager').add(PlayerObject);

		var MainRoomObject = this.ServicesLocator.get('MainRoomManager');
		MainRoomObject.add(PlayerObject);

		return {
			emit: true,
			data: {
				error: false,
				rooms: this.ServicesLocator.get('RoomsManager').getDataForList(this.ServicesLocator),
				playerID: PlayerObject.getID(),
				secretCode: PlayerObject.getSecretCode()
			},

			controllerData: {
				name: 'playerID',
				value: PlayerObject.getID()
			}
		}
	}
}

module.exports = UserEnterRequest;