class SocketRequestController {
	constructor(socket, Route, Player) {
		this.socket = socket;
		this.Route = Route;
		this.Player = Player;
	}

	connect() {
		var request = new SocketConnectRequest(this.socket, {});
		request.run();

		this.Route.redirect('pageLoading');
	}

	userEnter(data) {
		data.playerID = this.Player.getID();
		data.secretCode = this.Player.getSecretCode();

		var request = new UserEnterRequest(this.socket, data);
		request.run();

		this.Route.redirect('pageLoading');
	}

	createRoom(data) {
		data.playerID = this.Player.getID();
		data.secretCode = this.Player.getSecretCode();

		var request = new CreateRoomRequest(this.socket, data);
		request.run();

		this.Route.redirect('pageLoading');
	}

	enterInRoom(data) {
		data.playerID = this.Player.getID();
		data.secretCode = this.Player.getSecretCode();

		var request = new EnterInRoomRequest(this.socket, data);
		request.run();

		this.Route.redirect('pageLoading');
	}

	leaveRoom(data) {
		data.playerID = this.Player.getID();
		data.secretCode = this.Player.getSecretCode();

		var request = new LeaveRoomRequest(this.socket, data);
		request.run();
	}

	selectWord(data) {
		data.playerID = this.Player.getID();
		data.secretCode = this.Player.getSecretCode();

		var request = new SelectWordRequest(this.socket, data);
		request.run();
	}

	startGame(data) {
		data.playerID = this.Player.getID();
		data.secretCode = this.Player.getSecretCode();

		var request = new StartGameRequest(this.socket, data);
		request.run();
	}

	chatMessage(data) {
		data.playerID = this.Player.getID();
		data.secretCode = this.Player.getSecretCode();

		var request = new ChatMessageRequest(this.socket, data);
		request.run();
	}

	drawState(data, DrawModel) {
		var requestIntervalID = setInterval( () => {
			data.drawState = DrawModel.getNewDrawState();

			if ( data.drawState.length ) {
				data.playerID = this.Player.getID();
				data.secretCode = this.Player.getSecretCode();

				var request = new DrawStateRequest(this.socket, data);
				request.run();
			}

			DrawModel.clearNewDrawState();
		}, 1000);

		return requestIntervalID;
	}
}