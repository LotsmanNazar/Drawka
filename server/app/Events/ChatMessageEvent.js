var Event = require('./Event');
var EndRoundTask = require('../Tasks/EndRoundTask');

class ChatMessageEvent extends Event {
	constructor(Room, Player, message, ServicesLocator) {
		super();

		this.ServicesLocator = ServicesLocator;
		this.Room = Room;
		this.Player = Player;
		this.message = message;
	}

	run() {
		var RoomManagerObject = this.ServicesLocator.get('ObjectsCreator').roomManager(this.Room);
		var players = this.Room.getPlayers();

		var guessed = this.Room.getWord() == this.message;

		if ( guessed ) {
			this.Player.addToPoints(settings.wordPoints)
		}

		var SocketsManagerObject = this.ServicesLocator.get('SocketsManager');
		SocketsManagerObject.updatePlayers(this.ServicesLocator.get('PlayersManager'), players, 'chatMessage', {
			error: false,
			word: this.message,
			guessed: guessed,
			player: {
				id: this.Player.getID(),
				nickname: this.Player.getNickname(),
				points: this.Player.getPoints()
			}
		});

		if ( this.Room.getWord() == this.message ) {
			this.Room.clearEndRoundTask(this.ServicesLocator.get('TaskManager'));
			var EndRoundTaskObject = new EndRoundTask(0, this.Room, this.ServicesLocator.get('EventsManager'));
			EndRoundTaskObject.run();
		}
	}
}

module.exports = ChatMessageEvent;