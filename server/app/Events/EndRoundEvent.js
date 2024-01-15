var Event = require('./Event');
var EndGameTask = require('../Tasks/EndGameTask');
var StartSelectWordTask = require('../Tasks/StartSelectWordTask');

class EndRoundEvent extends Event {
	constructor(Room, ServicesLocator) {
		super();

		this.ServicesLocator = ServicesLocator;
		this.Room = Room;
	}

	run() {
		var RoomManagerObject = this.ServicesLocator.get('ObjectsCreator').roomManager(this.Room);
		var players = this.Room.getPlayers();
		this.Room.setRoundStarted(false);
		this.Room.clearDrawState();
		this.Room.setWordHint([]);

		var Drawer = this.ServicesLocator.get('PlayersManager').get(this.Room.getDrawer());
		Drawer.addToPoints(settings.drawerPoints);

		var SocketsManagerObject = this.ServicesLocator.get('SocketsManager');
		SocketsManagerObject.updatePlayers(this.ServicesLocator.get('PlayersManager'), players, 'roundEnded', {
			error: false,
			drawer: {
				id: Drawer.getID(),
				points: Drawer.getPoints()
			},
			room: {
				roundStarted: this.Room.getRoundStarted(),
			},
			word: this.Room.getWord()
		});

		this.Room.clearHintTask(this.ServicesLocator.get('TaskManager'));

		if ( this.Room.getRound() == this.Room.getMaxRounds() ) {
			var EndGameTaskObject = new EndGameTask(0, this.Room, this.ServicesLocator.get('EventsManager'));
			EndGameTaskObject.run();
		} else {
			var StartSelectWordTaskObject = new StartSelectWordTask(0, this.Room, this.ServicesLocator.get('EventsManager'));
			StartSelectWordTaskObject.run();
		}
	}
}

module.exports = EndRoundEvent;