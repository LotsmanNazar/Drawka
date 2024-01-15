var Event = require('./Event');
var StartRoundTask = require('../Tasks/StartRoundTask');

class EndSelectWordEvent extends Event {
	constructor(Room, ServicesLocator) {
		super();

		this.ServicesLocator = ServicesLocator;
		this.Room = Room;
	}

	run() {
		var RoomManagerObject = this.ServicesLocator.get('ObjectsCreator').roomManager(this.Room);
		var players = this.Room.getPlayers();

		if ( !this.Room.getWord() ) {
			RoomManagerObject.chooseWord();
		}

		var SocketsManagerObject = this.ServicesLocator.get('SocketsManager');
		var dataDrawer = {error: false, room: {word: this.Room.getWord()}};
		var dataPlayer = {error: false, room: {word: RoomManagerObject.getWordSecret()}};
		SocketsManagerObject.updatePlayersEndSelectWord(this.ServicesLocator.get('PlayersManager'), players, this.Room.getDrawer(), dataDrawer, dataPlayer);

		var StartRoundTaskObject = new StartRoundTask(0, this.Room, this.ServicesLocator.get('EventsManager'));
		StartRoundTaskObject.run();
	}
}

module.exports = EndSelectWordEvent;