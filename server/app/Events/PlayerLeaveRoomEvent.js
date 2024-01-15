var Event = require('./Event');
var EndGameTask = require('../Tasks/EndGameTask');
var EndRoundTask = require('../Tasks/EndRoundTask');

class PlayerLeaveRoomEvent extends Event {
	constructor(Room, Player, ServicesLocator) {
		super();

		this.ServicesLocator = ServicesLocator;
		this.Room = Room;
		this.Player = Player;
	}

	run() {
		var RoomManagerObject = this.ServicesLocator.get('ObjectsCreator').roomManager(this.Room);

		var wasDrawer = false;
		if ( this.Room.isDrawer(this.Player) ) {
			wasDrawer = true;
		}

		var wasAdmin = false;
		if ( this.Room.isAdmin(this.Player) ) {
			RoomManagerObject.chooseAdmin();
			wasAdmin = true;
		}

		this.Room.removePlayer(this.Player);

		var players = this.Room.getPlayers();

		var SocketsManagerObject = this.ServicesLocator.get('SocketsManager');
		SocketsManagerObject.updatePlayers(this.ServicesLocator.get('PlayersManager'), players, 'playerLeaveRoom', {
			error: false,
			player: RoomManagerObject.getPlayersData([this.Player]),
			room: {
				admin: this.Room.getAdmin(),
				playersCount: this.Room.getPlayersCount()
			}
		});

		if ( !this.Room.getPlayersCount() ) {
			var EndGameTaskObject = new EndGameTask(0, this.Room, this.ServicesLocator.get('EventsManager'));
			EndGameTaskObject.run();

			return false;
		}

		if ( wasDrawer ) {
			if ( !this.Room.getRoundStarted() ) {
				this.Room.setRound(this.Room.getRound() + 1 );
			}

			this.Room.clearEndRoundTask(this.ServicesLocator.get('TaskManager'));
			this.Room.clearEndSelectWordTask(this.ServicesLocator.get('TaskManager'));

			var EndRoundTaskObject = new EndRoundTask(0, this.Room, this.ServicesLocator.get('EventsManager'));
			EndRoundTaskObject.run();

			return false;
		}
	}
}

module.exports = PlayerLeaveRoomEvent;