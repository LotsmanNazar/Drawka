var RequestHandler = require('./RequestHandler');
var EndSelectWordTask = require('../Tasks/EndSelectWordTask');

class SelectWordRequest extends RequestHandler {
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

		if ( this.Room.getWord() || this.Room.getWords().indexOf(this.data.word) == -1 ) {
			return false;
		}

		this.Room.setWord(this.data.word);
		this.Room.clearEndSelectWordTask(this.ServicesLocator.get('TaskManager'));

		var EndSelectWordTaskObject = new EndSelectWordTask(0, this.Room, this.ServicesLocator.get('EventsManager'));
		EndSelectWordTaskObject.run();

		return {
			emit: false,
		}
	}
}

module.exports = SelectWordRequest;