var RequestHandler = require('./RequestHandler');

class LeaveRoomRequest extends RequestHandler {
	constructor(data, ServicesLocator) {
		super(data, ServicesLocator);
	}

	handle() {
		var playerDefined = this.playerDefined(true);
		if ( playerDefined ) {
			return playerDefined;
		}

		var roomDefined = this.roomDefined(true);
		if ( roomDefined ) {
			return roomDefined;
		}

		var MainRoomObject = this.ServicesLocator.get('MainRoomManager');

		this.ServicesLocator.get('EventsManager').triggerEvent('playerLeaveRoom', {
			Room: this.Room,
			Player: this.Player
		});

		MainRoomObject.add(this.Player);

		return {
			emit: true,
			data: {
				error: false,
				rooms: this.ServicesLocator.get('RoomsManager').getDataForList(this.ServicesLocator)
			}
		}
	}
}

module.exports = LeaveRoomRequest;