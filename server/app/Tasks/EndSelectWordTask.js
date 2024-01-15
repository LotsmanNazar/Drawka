var Task = require('../Entities/Task');

class EndSelectWordTask extends Task {
	constructor(timestamp, Room, EventsManager) {
		super(timestamp);

		this.Room = Room;
		this.EventsManager = EventsManager;
	}

	run() {
		this.EventsManager.triggerEvent('endSelectWord', {
			Room: this.Room
		});
	}
}

module.exports = EndSelectWordTask;