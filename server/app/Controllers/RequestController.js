var UserEnterRequest = require('../Requests/UserEnterRequest');
var CreateRoomRequest = require('../Requests/CreateRoomRequest');
var EnterInRoomRequest = require('../Requests/EnterInRoomRequest');
var LeaveRoomRequest = require('../Requests/LeaveRoomRequest');
var SelectWordRequest = require('../Requests/SelectWordRequest');
var StartGameRequest = require('../Requests/StartGameRequest');
var ChatMessageRequest = require('../Requests/ChatMessageRequest');
var DrawStateRequest = require('../Requests/DrawStateRequest');

class RequestController {
	constructor(ServicesLocator) {
		this.ServicesLocator = ServicesLocator;
		this.routes = [
			'userEnter',
			'createRoom',
			'enterInRoom',
			// 'leaveRoom',
			'selectWord',
			'startGame',
			'chatMessage',
			'drawState'
		];
	}

	getRoutes(name) {
		return this.routes;
	}

	getRoute(name) {
		var route = this.routes.indexOf(name);
		return this.routes[route];
	}

	userEnter(data) {
		var handler = new UserEnterRequest(data, this.ServicesLocator);
		return handler.handle();
	}

	createRoom(data) {
		var handler = new CreateRoomRequest(data, this.ServicesLocator);
		return handler.handle();
	}

	enterInRoom(data) {
		var handler = new EnterInRoomRequest(data, this.ServicesLocator);
		return handler.handle();
	}

	leaveRoom(data) {
		var handler = new LeaveRoomRequest(data, this.ServicesLocator);
		return handler.handle();
	}

	selectWord(data) {
		var handler = new SelectWordRequest(data, this.ServicesLocator);
		return handler.handle();
	}

	startGame(data) {
		var handler = new StartGameRequest(data, this.ServicesLocator);
		return handler.handle();
	}

	chatMessage(data) {
		var handler = new ChatMessageRequest(data, this.ServicesLocator);
		return handler.handle();
	}

	drawState(data) {
		var handler = new DrawStateRequest(data, this.ServicesLocator);
		return handler.handle();
	}
}

module.exports = RequestController;