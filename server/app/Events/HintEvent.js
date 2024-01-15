var Event = require('./Event');

class HintEvent extends Event {
	constructor(Room, ServicesLocator) {
		super();

		this.ServicesLocator = ServicesLocator;
		this.Room = Room;
	}

	run() {
		var RoomManagerObject = this.ServicesLocator.get('ObjectsCreator').roomManager(this.Room);
		var players = this.Room.getPlayers();

		RoomManagerObject.setHint(this.ServicesLocator.get('Helper'));

		var SocketsManagerObject = this.ServicesLocator.get('SocketsManager');
		SocketsManagerObject.updatePlayers(this.ServicesLocator.get('PlayersManager'), players, 'hint', {
			error: false,
			room: {
				word: RoomManagerObject.getWordSecret()
			}
		}, [this.Room.getDrawer()]);
	}
}

module.exports = HintEvent;