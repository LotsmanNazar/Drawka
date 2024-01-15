var RequestHandler = require('./RequestHandler');

class EnterInRoomRequest extends RequestHandler {
	constructor(data, ServicesLocator) {
		super(data, ServicesLocator);
	}

	handle() {
		var playerDefined = this.playerDefined(true, 'Try again.');
		if ( playerDefined ) {
			return playerDefined;
		}

		var roomDefined = this.roomDefined(false, 'You are already in the room.');
		if ( roomDefined ) {
			return roomDefined;
		}

		var RoomObject = this.ServicesLocator.get('RoomsManager').get(this.data.roomID);

		if ( RoomObject === undefined ) {
			return {
				emit: true,
				disconnect: true,
				data: {
					error: true,
					message: 'Room not found.'
				}
			}
		}

		if ( RoomObject.getPlayersCount() == RoomObject.getMaxPlayers() ) {
			return {
				emit: true,
				disconnect: true,
				data: {
					error: true,
					message: 'The room is already full.'
				}
			}
		}

		var MainRoomObject = this.ServicesLocator.get('MainRoomManager');
		var RoomManagerObject = this.ServicesLocator.get('ObjectsCreator').roomManager(RoomObject);
		RoomObject.addPlayer(this.Player);

		this.ServicesLocator.get('EventsManager').triggerEvent('playerEnterInRoom', {
			Room: RoomObject,
			Player: this.Player
		});

		MainRoomObject.remove(this.Player);

		var timer;

		if ( RoomObject.getStatus() == 'not-started' ) {
			timer = RoomManagerObject.getStartTimer(this.ServicesLocator.get('Helper'));
		}

		if ( RoomObject.getStatus() == 'started' && !RoomObject.getRoundStarted() ) {
			timer = RoomManagerObject.getRoundStartTimer(this.ServicesLocator.get('Helper'));
		}

		if ( RoomObject.getRoundStarted() ) {
			timer = RoomManagerObject.getRoundEndTimer(this.ServicesLocator.get('Helper'));
		}

		return {
			emit: true,
			data: {
				error: false,
				room: RoomManagerObject.getDataToSend(),
				timer: timer
			}
		}
	}
}

module.exports = EnterInRoomRequest;