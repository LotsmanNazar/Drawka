var Task = require('../Entities/Task');

class StartRoundTask extends Task {
	constructor(timestamp, Room, EventsManager) {
		super(timestamp);

		this.Room = Room;
		this.EventsManager = EventsManager;
	}

	run() {
		this.EventsManager.triggerEvent('roundStarted', {
			Room: this.Room
		});
	}
}

module.exports = StartRoundTask;