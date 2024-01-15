class LocalStorageManager {
	constructor(ServicesLocator) {
		this.ServicesLocator = ServicesLocator;
		this.storage = window.localStorage;

		this.init();
	}

	init() {
		window.addEventListener('storage', () => {
			// return false;

			if ( !this.ServicesLocator.get('SocketController').getSocket().connected ) {
				return false;
			}

			this.ServicesLocator.get('SocketController').getSocket().disconnect();
			this.ServicesLocator.get('Vue').setErrorMessage('The game can only run in one browser window.');
			this.ServicesLocator.get('Route').redirect('pageError');
		});
	}

	add(name, data) {
		this.storage.setItem(name, data);
	}

	get(name) {
		return this.storage.getItem(name);
	}

	remove(name) {
		this.storage.removeItem(name);
	}
}