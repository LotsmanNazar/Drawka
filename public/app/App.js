class App {
	constructor() {
		this.ServicesLocator = new ServicesLocator();
		this.ServicesLocator.add('CookiesManager', new CookiesManager());
		this.ServicesLocator.add('Localization', new Localization(this.ServicesLocator.get('CookiesManager')));
		this.ServicesLocator.add('LocalStorageManager', new LocalStorageManager(this.ServicesLocator));
		this.ServicesLocator.add('RoomsManager', new RoomsManager());
		this.ServicesLocator.add('PlayersManager', new PlayersManager());
	}

	init(Vue) {
		this.ServicesLocator.add('DrawController', new DrawController(Vue.$refs.draw, Vue.$refs.drawWrapper));
		this.ServicesLocator.add('ChatController', new ChatController(Vue.$refs.chatForm, Vue.$refs.chat, this.ServicesLocator.get('Localization')));
		this.ServicesLocator.add('Vue', Vue);
		this.ServicesLocator.add('Route', new Route(this.ServicesLocator));
		this.ServicesLocator.add('SocketController', new SocketController(this.ServicesLocator));
		
		this.MiddlewareHandler = new MiddlewareHandler(this.ServicesLocator);
		this.MiddlewareHandler.load();
		this.ChatHandler = new ChatHandler(this.ServicesLocator);
	}

	getServicesLocator() {
		return this.ServicesLocator;
	}
}