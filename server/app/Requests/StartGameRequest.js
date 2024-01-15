var RequestHandler = require('./RequestHandler');
var StartGameTask = require('../Tasks/StartGameTask');

class StartGameRequest extends RequestHandler {
	constructor(data, ServicesLocator) {
		super(data, ServicesLocator);
	}

	handle() {
		var playerDefined = this.playerDefined(true);
		if ( playerDefined ) {
			return playerDefined;
		}

		var roomDefined = this.roomDefined(true);
		if ( roomDefined ) {
			return roomDefined;
		}

		if ( this.Room.getStatus() != 'not-started' || this.Room.getPlayersCount() < 2 ) {
			return false;
		}

		this.Room.clearStartGameTask(this.ServicesLocator.get('TaskManager'));
		var StartGameTaskObject = new StartGameTask(0, this.Room, this.ServicesLocator.get('EventsManager'));
		StartGameTaskObject.run();

		return {
			emit: false
		}
	}
}

module.exports = StartGameRequest;