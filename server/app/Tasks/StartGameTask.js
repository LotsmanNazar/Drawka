var Task = require('../Entities/Task');

class StartGameTask extends Task {
	constructor(timestamp, Room, EventsManager) {
		super(timestamp);

		this.Room = Room;
		this.EventsManager = EventsManager;
	}

	run() {
		this.EventsManager.triggerEvent('gameStarted', {
			Room: this.Room
		});
	}
}

module.exports = StartGameTask;