class SettingsHandler {
	constructor(wrapper) {
		this.wrapper = wrapper;
	}

	getValues() {
		var fields = this.wrapper.querySelectorAll('.game-settings-field');
		var values = {};

		for ( var i = 0; i < fields.length; i++ ) {
			values[fields[i].getAttribute('name')] = fields[i].value;
		}

		return values;
	}
}