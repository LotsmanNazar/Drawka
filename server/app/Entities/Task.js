var Entity = require('./Entity');

class Task extends Entity {
	constructor(timestamp) {
		super();

		this.timestamp = timestamp;
		this.ID;
	}

	getTimestamp() {
		return this.timestamp;
	}

	run() {

	}
}

module.exports = Task;