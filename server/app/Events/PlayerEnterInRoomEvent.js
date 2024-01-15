var Event = require('./Event');

class PlayerEnterInRoomEvent extends Event {
	constructor(Room, Player, ServicesLocator) {
		super();

		this.ServicesLocator = ServicesLocator;
		this.Room = Room;
		this.Player = Player;
	}

	run() {
		var RoomManagerObject = this.ServicesLocator.get('ObjectsCreator').roomManager(this.Room);
		var players = this.Room.getPlayers();

		var SocketsManagerObject = this.ServicesLocator.get('SocketsManager');
		SocketsManagerObject.updatePlayers(this.ServicesLocator.get('PlayersManager'), players, 'playerEnterInRoom', {
			error: false,
			player: RoomManagerObject.getPlayersData([this.Player]),
			room: {
				playersCount: this.Room.getPlayersCount()
			}
		}, [this.Player.getID()]);
	}
}

module.exports = PlayerEnterInRoomEvent;