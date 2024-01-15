class EventsManager {
	constructor() {
		this.events = {};
	}

	add(name, callback) {
		this.events[name] = callback;
	}

	triggerEvent(name, values) {
		if ( this.events[name] ) {
			this.events[name](values);
		}
	}
}

module.exports = EventsManager;