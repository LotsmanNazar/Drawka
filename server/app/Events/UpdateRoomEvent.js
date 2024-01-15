var Event = require('./Event');
var UpdateRoomTask = require('../Tasks/UpdateRoomTask');

class UpdateRoomEvent extends Event {
	constructor(Room, ServicesLocator) {
		super();

		this.ServicesLocator = ServicesLocator;
		this.Room = Room;
	}

	run() {
		var RoomManagerObject = this.ServicesLocator.get('ObjectsCreator').roomManager(this.Room);
		var players = this.Room.getPlayers();

		var data = RoomManagerObject.getDataToSend();
		var SocketsManagerObject = this.ServicesLocator.get('SocketsManager');
		SocketsManagerObject.updatePlayers(this.ServicesLocator.get('PlayersManager'), players, 'updateRoom', {
			error: false,
			room: data
		}, [this.Room.getDrawer()]);

		if ( this.Room.getDrawer() ) {
			data.word = this.Room.getWord();
			SocketsManagerObject.updatePlayers(this.ServicesLocator.get('PlayersManager'), [this.Room.getDrawer()], 'updateRoom', {
				error: false,
				room: data
			});
		}

		var timestamp = this.ServicesLocator.get('Helper').getTimestamp(settings.updateRoom);
		var UpdateRoomTaskObject = new UpdateRoomTask(timestamp, this.Room, this.ServicesLocator.get('EventsManager'));
		this.Room.setUpdateRoomTask(UpdateRoomTaskObject);
		this.ServicesLocator.get('TaskManager').add(UpdateRoomTaskObject);
	}
}

module.exports = UpdateRoomEvent;