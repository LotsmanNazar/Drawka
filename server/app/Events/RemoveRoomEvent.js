var Event = require('./Event');

class RemoveRoomEvent extends Event {
	constructor(Room, ServicesLocator) {
		super();

		this.ServicesLocator = ServicesLocator;
		this.Room = Room;
	}

	run() {
		var RoomManagerObject = this.ServicesLocator.get('ObjectsCreator').roomManager(this.Room);
		var players = this.ServicesLocator.get('MainRoomManager').getAll();
		var roomPlayers = this.Room.getPlayers();

		var SocketsManagerObject = this.ServicesLocator.get('SocketsManager');
		SocketsManagerObject.updatePlayers(this.ServicesLocator.get('PlayersManager'), players, 'removeRoom', {
			error: false,
			roomID: this.Room.getID(),
			room: {
				status: this.Room.getStatus(),
				maxPlayers: 0,
				playersCount: 0,
				maxRounds: 0,
				round: 0
			}
		}, roomPlayers);

		SocketsManagerObject.disconnectPlayers(this.ServicesLocator.get('PlayersManager'), roomPlayers)
	}
}

module.exports = RemoveRoomEvent ;