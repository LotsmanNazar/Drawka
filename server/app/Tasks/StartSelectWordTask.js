var Task = require('../Entities/Task');

class StartSelectWordTask extends Task {
	constructor(timestamp, Room, EventsManager) {
		super(timestamp);

		this.Room = Room;
		this.EventsManager = EventsManager;
	}

	run() {
		this.EventsManager.triggerEvent('startSelectWord', {
			Room: this.Room
		});
	}
}

module.exports = StartSelectWordTask;