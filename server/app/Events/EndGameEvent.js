var Event = require('./Event');

class EndGameEvent extends Event {
	constructor(Room, ServicesLocator) {
		super();

		this.ServicesLocator = ServicesLocator;
		this.Room = Room;
	}

	run() {
		var RoomManagerObject = this.ServicesLocator.get('ObjectsCreator').roomManager(this.Room);
		var players = this.Room.getPlayers();

		this.Room.setStatus('ended');

		var SocketsManagerObject = this.ServicesLocator.get('SocketsManager');
		SocketsManagerObject.updatePlayers(this.ServicesLocator.get('PlayersManager'), players, 'gameEnded', {
			error: false,
			room: {
				status: this.Room.getStatus()
			}
		});

		this.Room.clearStartGameTask(this.ServicesLocator.get('TaskManager'));
		this.Room.clearEndRoundTask(this.ServicesLocator.get('TaskManager'));
		this.Room.clearEndSelectWordTask(this.ServicesLocator.get('TaskManager'));
		this.Room.clearUpdateRoomTask(this.ServicesLocator.get('TaskManager'));
		this.Room.clearHintTask(this.ServicesLocator.get('TaskManager'));
		this.ServicesLocator.get('RoomsManager').remove(this.Room);

		this.ServicesLocator.get('EventsManager').triggerEvent('removeRoom', {
			Room: this.Room
		});
	}
}

module.exports = EndGameEvent;