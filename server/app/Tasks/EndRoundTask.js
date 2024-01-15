var Task = require('../Entities/Task');

class EndRoundTask extends Task {
	constructor(timestamp, Room, EventsManager) {
		super(timestamp);

		this.Room = Room;
		this.EventsManager = EventsManager;
	}

	run() {
		this.EventsManager.triggerEvent('roundEnded', {
			Room: this.Room
		});
	}
}

module.exports = EndRoundTask;