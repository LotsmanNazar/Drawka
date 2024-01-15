var Task = require('../Entities/Task');

class UpdateRoomTask extends Task {
	constructor(timestamp, Room, EventsManager) {
		super(timestamp);

		this.Room = Room;
		this.EventsManager = EventsManager;
	}

	run() {
		this.EventsManager.triggerEvent('updateRoom', {
			Room: this.Room
		});
	}
}

module.exports = UpdateRoomTask;