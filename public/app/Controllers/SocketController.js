class SocketController {
	constructor(ServicesLocator) {
		this.ServicesLocator = ServicesLocator;

		this.socket = io('ws://' + window.location.host + ':8090', {
			autoConnect: false,
      transports: ['websocket'],
      upgrade: false,
      reconnection: false,
      cookie: true
		});

		this.SocketRequestController = new SocketRequestController(this.socket, ServicesLocator.get('Route'), ServicesLocator.get('PlayersManager').getCurrentPlayer());
		this.SocketResponseController = new SocketResponseController(ServicesLocator);

		this.init();
	}

	init() {
		this.socket.on('disconnect', () => {
			this.SocketResponseController.disconnect({});
		});

		this.socket.onAny( (name, data) => {
			var response = this.SocketResponseController.getResponse(name);
			if ( response ) {
				this.SocketResponseController[response](data);
			}
		});
	}

	getRequestController() {
		return this.SocketRequestController;
	}

	getResponseController() {
		return this.SocketResponseController;
	}

	getSocket() {
		return this.socket;
	}
}