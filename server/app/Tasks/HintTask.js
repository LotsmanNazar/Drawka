var Task = require('../Entities/Task');

class HintTask extends Task {
	constructor(timestamp, Room, EventsManager) {
		super(timestamp);

		this.Room = Room;
		this.EventsManager = EventsManager;
	}

	run() {
		this.EventsManager.triggerEvent('hint', {
			Room: this.Room
		});
	}
}

module.exports = HintTask;