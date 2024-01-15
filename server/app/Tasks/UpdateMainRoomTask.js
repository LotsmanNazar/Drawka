var Task = require('../Entities/Task');

class UpdateMainRoomTask extends Task {
	constructor(timestamp, EventsManager) {
		super(timestamp);

		this.EventsManager = EventsManager;
	}

	run() {
		this.EventsManager.triggerEvent('updateMainRoom');
	}
}

module.exports = UpdateMainRoomTask;