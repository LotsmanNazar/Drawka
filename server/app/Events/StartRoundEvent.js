var Event = require('./Event');
var EndRoundTask = require('../Tasks/EndRoundTask');
var HintTask = require('../Tasks/HintTask');

class StartRoundEvent extends Event {
	constructor(Room, ServicesLocator) {
		super();

		this.ServicesLocator = ServicesLocator;
		this.Room = Room;
	}

	run() {
		var RoomManagerObject = this.ServicesLocator.get('ObjectsCreator').roomManager(this.Room);
		var players = this.Room.getPlayers();
		var endRoundTimestamp = this.ServicesLocator.get('Helper').getTimestamp(settings.roundTime);
		var hintTimestamp = this.ServicesLocator.get('Helper').getTimestamp(settings.hintTime);

		this.Room.setEndRoundTimestamp(endRoundTimestamp);
		this.Room.setRound(this.Room.getRound() + 1 );
		this.Room.setRoundStarted(true);

		var SocketsManagerObject = this.ServicesLocator.get('SocketsManager');
		SocketsManagerObject.updatePlayers(this.ServicesLocator.get('PlayersManager'), players, 'roundStarted', {
			error: false,
			timer: RoomManagerObject.getRoundEndTimer(this.ServicesLocator.get('Helper')),
			room: {
				round: this.Room.getRound(),
				roundStarted: this.Room.getRoundStarted()
			}
		});

		var EndRoundTaskObject = new EndRoundTask(endRoundTimestamp, this.Room, this.ServicesLocator.get('EventsManager'));
		this.ServicesLocator.get('TaskManager').add(EndRoundTaskObject);
		this.Room.setEndRoundTask(EndRoundTaskObject);

		var HintEventObject = new HintTask(hintTimestamp, this.Room, this.ServicesLocator.get('EventsManager'));
		this.ServicesLocator.get('TaskManager').add(HintEventObject);
		this.Room.setHintTask(HintEventObject);
	}
}

module.exports = StartRoundEvent;