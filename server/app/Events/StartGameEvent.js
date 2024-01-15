var Event = require('./Event');
var StartSelectWordTask = require('../Tasks/StartSelectWordTask');

class StartGameEvent extends Event {
	constructor(Room, ServicesLocator) {
		super();

		this.ServicesLocator = ServicesLocator;
		this.Room = Room;
	}

	run() {
		var RoomManagerObject = this.ServicesLocator.get('ObjectsCreator').roomManager(this.Room);
		var players = this.Room.getPlayers();
		this.Room.setStatus('started');

		var SocketsManagerObject = this.ServicesLocator.get('SocketsManager');
		SocketsManagerObject.updatePlayers(this.ServicesLocator.get('PlayersManager'), players, 'gameStarted', {
			error: false,
			room: RoomManagerObject.getDataToSend()
		});

		var StartSelectWordTaskObject = new StartSelectWordTask(0, this.Room, this.ServicesLocator.get('EventsManager'));
		StartSelectWordTaskObject.run();
	}
}

module.exports = StartGameEvent;