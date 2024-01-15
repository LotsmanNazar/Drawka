var Task = require('../Entities/Task');

class EndGameTask extends Task {
	constructor(timestamp, Room, EventsManager) {
		super(timestamp);

		this.Room = Room;
		this.EventsManager = EventsManager;
	}

	run() {
		this.EventsManager.triggerEvent('gameEnded', {
			Room: this.Room
		});
	}
}

module.exports = EndGameTask;