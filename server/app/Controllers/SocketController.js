var RequestController = require('./RequestController')

class SocketController {
	constructor(socket, ServicesLocator) {
		this.socket = socket;
		this.ServicesLocator = ServicesLocator;

		this.ID;
		this.payerID;
		this.RequestController = new RequestController(this.ServicesLocator);

		this.init();
	}

	init() {
		this.emit('connected', {
			error: false
		});

		this.socket.onAny( (name, data) => {
			var route = this.RequestController.getRoute(name);
			
			if ( route ) {
				data.socketID = this.getID();
				var result = this.RequestController[route](data);
				
				if ( result.emit ) {
					this.emit(name, result.data);
				}

				if ( result.disconnect ) {
					this.disconnect(result.data.message);
				}

				if ( result.controllerData ) {
					this[result.controllerData.name] = result.controllerData.value;
				}
			}
		});
	}

	setID(id) {
		this.ID = id;
	}

	getID() {
		return this.ID;
	}

	getPlayerID() {
		return this.playerID;
	}

	emit(name, data) {
		this.socket.emit(name, data);
	}

	disconnect(message = '') {
		if ( message !== '' ) {
			this.emit('userDisconnect', {
				message: message
			});
		}

		this.socket.disconnect();
	}
}

module.exports = SocketController;