class Route {
	constructor(ServicesLocator) {
		this.ServicesLocator = ServicesLocator;
		this.Vue = ServicesLocator.get('Vue');

		this.pages = {
			pageLoading: this.Vue.$refs.pageLoading,
			pageEnter: this.Vue.$refs.pageEnter,
			pageRooms: this.Vue.$refs.pageRooms,
			pageRoom: this.Vue.$refs.pageRoom,
			pageCreateRoom: this.Vue.$refs.pageCreateRoom,
			pageEndGame: this.Vue.$refs.pageEndGame,
			pageError: this.Vue.$refs.pageError,
			pageSettings: this.Vue.$refs.pageSettings
		};

		this.init();
	}

	init() {
		this.show('pageLoading');
	}

	redirect(name, hideAll = true) {
		if ( this.Vue.getCurrentPage() == name ) {
			return false;
		}

		this.Vue.setCurrentPage(name);
		this.hideAll();
		this.show(name);
	}

	setLocationParameter(name, value) {
		window.history.replaceState(null, null, '?' + name + '=' + value);
	}

	clearLocationParameters() {
		window.history.replaceState(null, null, '/');
	}

	getURLParameter(name) {
		var values = new URLSearchParams(window.location.search);
		var value = values.get(name);

		return value;
	}

	show(name) {
		this.Vue.showWrapper(this.pages[name]);
	}

	hide(page) {
		this.Vue.hideWrapper(page);
	}

	hideAll() {
		for ( name in this.pages ) {
			this.hide(this.pages[name]);
		}
	}
}