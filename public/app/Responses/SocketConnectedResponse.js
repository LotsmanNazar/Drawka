class SocketConnectedResponse extends SocketResponse {
	constructor(ServicesLocator, data) {
		super(ServicesLocator, data);
	}

	run() {
		var RequestControllerObject = this.ServicesLocator.get('SocketController').getRequestController();
		var PlayerObject = this.ServicesLocator.get('PlayersManager').getCurrentPlayer();

		RequestControllerObject.userEnter({
			nickname: PlayerObject.getNickname()
		});
	}
}