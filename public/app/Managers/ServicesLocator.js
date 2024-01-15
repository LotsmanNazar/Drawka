class ServicesLocator {
	constructor() {
		this.services = {};
	}

	get(name) {
		return this.services[name];
	}

	add(name, object) {
		this.services[name] = object;
	}
}