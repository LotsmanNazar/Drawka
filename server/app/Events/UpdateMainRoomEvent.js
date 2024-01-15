var Event = require('./Event');
var UpdateMainRoomTask = require('../Tasks/UpdateMainRoomTask');

class UpdateMainRoomEvent extends Event {
	constructor(ServicesLocator) {
		super();

		this.ServicesLocator = ServicesLocator;
	}

	run() {
		var players = this.ServicesLocator.get('MainRoomManager').getAll();

		var SocketsManagerObject = this.ServicesLocator.get('SocketsManager');
		SocketsManagerObject.updatePlayers(this.ServicesLocator.get('PlayersManager'), players, 'updateMainRoom', {
			error: false,
			rooms: this.ServicesLocator.get('RoomsManager').getDataForList(this.ServicesLocator)
		});

		var timestamp = this.ServicesLocator.get('Helper').getTimestamp(settings.updateMainRoom);
		var UpdateMainRoomTaskObject = new UpdateMainRoomTask(timestamp, this.ServicesLocator.get('EventsManager'));
		this.ServicesLocator.get('TaskManager').add(UpdateMainRoomTaskObject);
	}
}

module.exports = UpdateMainRoomEvent;