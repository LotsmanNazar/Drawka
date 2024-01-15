class SocketResponseController {
	constructor(ServicesLocator) {
		this.ServicesLocator = ServicesLocator;
		this.responses = [
			'connected',
			'userEnter',
			'createRoom',
			'enterInRoom',
			'leaveRoom',
			'gameStarted',
			'gameEnded',
			'roundStarted',
			'roundEnded',
			'roundStartedDrawer',
			'startSelectWord',
			'endSelectWord',
			'playerEnterInRoom',
			'playerLeaveRoom',
			'updateRoom',
			'newRoom',
			'removeRoom',
			'updateMainRoom',
			'disconnect',
			'userDisconnect',
			'chatMessage',
			'drawState',
			'hint'
		];
	}

	getResponses() {
		return this.responses;
	}

	getResponse(name) {
		var responseID = this.responses.indexOf(name);
		return this.responses[responseID];
	}

	connected(data) {
		var response = new SocketConnectedResponse(this.ServicesLocator, data);
		response.run();
	}

	userEnter(data) {
		var response = new UserEnterResponse(this.ServicesLocator, data);
		response.run();
	}

	createRoom(data) {
		var response = new CreateRoomResponse(this.ServicesLocator, data);
		response.run();
	}

	enterInRoom(data) {
		var response = new EnterInRoomResponse(this.ServicesLocator, data);
		response.run();
	}

	leaveRoom(data) {
		var response = new LeaveRoomResponse(this.ServicesLocator, data);
		response.run();
	}

	gameStarted(data) {
		var response = new GameStartedResponse(this.ServicesLocator, data);
		response.run();
	}

	gameEnded(data) {
		var response = new GameEndedResponse(this.ServicesLocator, data);
		response.run();
	}

	roundStarted(data) {
		var response = new RoundStartedResponse(this.ServicesLocator, data);
		response.run();
	}

	roundEnded(data) {
		var response = new RoundEndedResponse(this.ServicesLocator, data);
		response.run();
	}

	roundStartedDrawer(data) {
		var response = new RoundStartedDrawerResponse(this.ServicesLocator, data);
		response.run();
	}

	startSelectWord(data) {
		var response = new StartSelectWordResponse(this.ServicesLocator, data);
		response.run();
	}

	endSelectWord(data) {
		var response = new EndSelectWordResponse(this.ServicesLocator, data);
		response.run();
	}

	playerEnterInRoom(data) {
		var response = new PlayerEnterInRoomResponse(this.ServicesLocator, data);
		response.run();
	}

	playerLeaveRoom(data) {
		var response = new PlayerLeaveRoomResponse(this.ServicesLocator, data);
		response.run();
	}

	updateRoom(data) {
		var response = new UpdateRoomResponse(this.ServicesLocator, data);
		response.run();
	}

	newRoom(data) {
		var response = new NewRoomResponse(this.ServicesLocator, data);
		response.run();
	}

	removeRoom(data) {
		var response = new RemoveRoomResponse(this.ServicesLocator, data);
		response.run();
	}

	updateMainRoom(data) {
		var response = new UpdateMainRoomResponse(this.ServicesLocator, data);
		response.run();
	}

	chatMessage(data) {
		var response = new ChatMessageResponse(this.ServicesLocator, data);
		response.run();
	}

	drawState(data) {
		var response = new DrawStateResponse(this.ServicesLocator, data);
		response.run();
	}

	hint(data) {
		var response = new HintResponse(this.ServicesLocator, data);
		response.run();
	}

	disconnect(data) {
		var response = new DisconnectResponse(this.ServicesLocator, data);
		response.run();
	}

	userDisconnect(data) {
		var response = new UserDisconnectResponse(this.ServicesLocator, data);
		response.run();
	}
}