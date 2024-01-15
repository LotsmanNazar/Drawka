var Event = require('./Event');
var EndSelectWordTask = require('../Tasks/EndSelectWordTask');

class StartSelectWordEvent extends Event {
	constructor(Room, ServicesLocator) {
		super();

		this.ServicesLocator = ServicesLocator;
		this.Room = Room;
	}

	run() {
		var RoomManagerObject = this.ServicesLocator.get('ObjectsCreator').roomManager(this.Room);
		var players = this.Room.getPlayers();

		RoomManagerObject.chooseDrawer();
		var words = RoomManagerObject.getWords(this.ServicesLocator.get('Helper'))

		var timestamp = this.ServicesLocator.get('Helper').getTimestamp(settings.selectWordTime);
		this.Room.setStartRoundTimestamp(timestamp);
		this.Room.setWords(words);
		this.Room.setWord(undefined);

		var SocketsManagerObject = this.ServicesLocator.get('SocketsManager');
		var timer = RoomManagerObject.getRoundStartTimer(this.ServicesLocator.get('Helper'));

		var dataDrawer = {
			error: false,
			timer: timer,
			room: {
				words: words,
				drawer: this.Room.getDrawer(),
				roundStarted: this.Room.getRoundStarted()
			}
		};

		var dataPlayer = {
			error: false,
			timer: timer,
			room: {
				drawer: this.Room.getDrawer(),
				roundStarted: this.Room.getRoundStarted()
			}
		}

		SocketsManagerObject.updatePlayersStartSelectWord(this.ServicesLocator.get('PlayersManager'), players, this.Room.getDrawer(), dataDrawer, dataPlayer);

		var EndSelectWordTaskObject = new EndSelectWordTask(timestamp, this.Room, this.ServicesLocator.get('EventsManager'));
		this.ServicesLocator.get('TaskManager').add(EndSelectWordTaskObject);
		this.Room.setEndSelectWordTask(EndSelectWordTaskObject);
	}
}

module.exports = StartSelectWordEvent;