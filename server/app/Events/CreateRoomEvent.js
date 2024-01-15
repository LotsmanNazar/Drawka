var Event = require('./Event');

class CreateRoomEvent extends Event {
	constructor(Room, Player, ServicesLocator) {
		super();

		this.ServicesLocator = ServicesLocator;
		this.Room = Room;
		this.Player = Player;
	}

	run() {
		var RoomManagerObject = this.ServicesLocator.get('ObjectsCreator').roomManager(this.Room);
		var players = this.ServicesLocator.get('MainRoomManager').getAll();

		var SocketsManagerObject = this.ServicesLocator.get('SocketsManager');

		if ( !this.Room.isPrivate() ) {
			SocketsManagerObject.updatePlayers(this.ServicesLocator.get('PlayersManager'), players, 'newRoom', {
				error: false,
				room: RoomManagerObject.getDataToSend()
			}, [this.Player.getID()]);
		}
	}
}

module.exports = CreateRoomEvent;