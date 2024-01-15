var RequestHandler = require('./RequestHandler');

class CreateRoomRequest extends RequestHandler {
	constructor(data, ServicesLocator) {
		super(data, ServicesLocator);
	}

	validate() {
		if ( this.data.maxPlayers === undefined || this.data.maxPlayers < 2 || this.data.maxPlayers > 10 ) {
			return false;
		}

		if ( this.data.maxRounds === undefined || this.data.maxRounds < 2 || this.data.maxRounds > 10 ) {
			return false;
		}

		if ( this.data.lang === undefined || ['en', 'ru'].indexOf(this.data.lang) == -1 ) {
			return false;
		}

		if ( this.data.private === undefined || ['yes', 'no'].indexOf(this.data.private) == -1 ) {
			return false;
		}

		return true;
	}

	handle() {
		if ( !this.validate() ) {
			return {
				emit: true,
				disconnect: true,
				data: {
					error: true,
					message: 'Wrong values.'
				}
			}
		}

		if ( this.ServicesLocator.get('RoomsManager').getCount() == settings.maxRooms ) {
			return {
				emit: true,
				disconnect: true,
				data: {
					error: true,
					message: 'The server contains the maximum number of rooms. Select an existing room or try again later.'
				}
			}
		}

		var playerDefined = this.playerDefined(true, 'Try again.');
		if ( playerDefined ) {
			return playerDefined;
		}

		var roomDefined = this.roomDefined(false, 'You are already in the room.');
		if ( roomDefined ) {
			return roomDefined;
		}

		var RoomObject = this.ServicesLocator.get('ObjectsCreator').room(this.data, this.Player);
		var RoomManagerObject = this.ServicesLocator.get('ObjectsCreator').roomManager(RoomObject);
		this.ServicesLocator.get('RoomsManager').add(RoomObject);

		this.ServicesLocator.get('EventsManager').triggerEvent('createRoom', {
			Room: RoomObject,
			Player: this.Player
		});

		var MainRoomObject = this.ServicesLocator.get('MainRoomManager');
		MainRoomObject.remove(this.Player);

		return {
			emit: true,
			data: {
				error: false,
				room: RoomManagerObject.getDataToSend(),
				timer: RoomManagerObject.getStartTimer(this.ServicesLocator.get('Helper'))
			}
		}
	}
}

module.exports = CreateRoomRequest;