settings = require('./settings');
var ServicesLocator = require('./Includes/ServicesLocator');
var UpdateMainRoomTask = require('./Tasks/UpdateMainRoomTask');
var StartGameEvent = require('./Events/StartGameEvent');
var EndGameEvent = require('./Events/EndGameEvent');
var StartRoundEvent = require('./Events/StartRoundEvent');
var HintEvent = require('./Events/HintEvent');
var EndRoundEvent = require('./Events/EndRoundEvent');
var StartSelectWordEvent = require('./Events/StartSelectWordEvent');
var EndSelectWordEvent = require('./Events/EndSelectWordEvent');
var PlayerEnterInRoomEvent = require('./Events/PlayerEnterInRoomEvent');
var PlayerLeaveRoomEvent = require('./Events/PlayerLeaveRoomEvent');
var UpdateRoomEvent = require('./Events/UpdateRoomEvent');
var CreateRoomEvent = require('./Events/CreateRoomEvent');
var RemoveRoomEvent = require('./Events/RemoveRoomEvent');
var UpdateMainRoomEvent = require('./Events/UpdateMainRoomEvent');
var ChatMessageEvent = require('./Events/ChatMessageEvent');
var DrawStateEvent = require('./Events/DrawStateEvent');
var SocketController = require('./Controllers/SocketController');
var HTTPController = require('./Controllers/HTTPController');

class App {
	constructor() {
		this.express = require('express');
		this.socketExpress = this.express();
		this.httpExpress = this.express();
		this.socketServer = require('http').createServer(this.socketExpress);
		this.httpServer = require('http').createServer(this.httpExpress);
		this.io = require('socket.io')(this.socketServer);
		this.path = require('path');

		this.ServicesLocator = new ServicesLocator();

		this.init();
	}

	init() {
		this.socketServer.listen(8090);
		this.httpServer.listen(80);

		this.HTTPController = new HTTPController(this.httpExpress, this.path);

		this.ServicesLocator.get('EventsManager').add('gameStarted', (values) => {
			var EventObject = new StartGameEvent(values.Room, this.ServicesLocator);
			EventObject.run();
		});

		this.ServicesLocator.get('EventsManager').add('gameEnded', (values) => {
			var EventObject = new EndGameEvent(values.Room, this.ServicesLocator);
			EventObject.run();
		});

		this.ServicesLocator.get('EventsManager').add('roundStarted', (values) => {
			var EventObject = new StartRoundEvent(values.Room, this.ServicesLocator);
			EventObject.run();
		});

		this.ServicesLocator.get('EventsManager').add('hint', (values) => {
			var EventObject = new HintEvent(values.Room, this.ServicesLocator);
			EventObject.run();
		});

		this.ServicesLocator.get('EventsManager').add('roundEnded', (values) => {
			var EventObject = new EndRoundEvent(values.Room, this.ServicesLocator);
			EventObject.run();
		});

		this.ServicesLocator.get('EventsManager').add('startSelectWord', (values) => {
			var EventObject = new StartSelectWordEvent(values.Room, this.ServicesLocator);
			EventObject.run();
		});

		this.ServicesLocator.get('EventsManager').add('endSelectWord', (values) => {
			var EventObject = new EndSelectWordEvent(values.Room, this.ServicesLocator);
			EventObject.run();
		});

		this.ServicesLocator.get('EventsManager').add('playerEnterInRoom', (values) => {
			var EventObject = new PlayerEnterInRoomEvent(values.Room, values.Player, this.ServicesLocator);
			EventObject.run();
		});

		this.ServicesLocator.get('EventsManager').add('playerLeaveRoom', (values) => {
			var EventObject = new PlayerLeaveRoomEvent(values.Room, values.Player, this.ServicesLocator);
			EventObject.run();
		});

		this.ServicesLocator.get('EventsManager').add('updateRoom', (values) => {
			var EventObject = new UpdateRoomEvent(values.Room, this.ServicesLocator);
			EventObject.run();
		});

		this.ServicesLocator.get('EventsManager').add('createRoom', (values) => {
			var EventObject = new CreateRoomEvent(values.Room, values.Player, this.ServicesLocator);
			EventObject.run();
		});

		this.ServicesLocator.get('EventsManager').add('removeRoom', (values) => {
			var EventObject = new RemoveRoomEvent(values.Room, this.ServicesLocator);
			EventObject.run();
		});

		this.ServicesLocator.get('EventsManager').add('updateMainRoom', (values) => {
			var EventObject = new UpdateMainRoomEvent(this.ServicesLocator);
			EventObject.run();
		});

		this.ServicesLocator.get('EventsManager').add('chatMessage', (values) => {
			var EventObject = new ChatMessageEvent(values.Room, values.Player, values.message, this.ServicesLocator);
			EventObject.run();
		});

		this.ServicesLocator.get('EventsManager').add('drawState', (values) => {
			var EventObject = new DrawStateEvent(values.Room, values.Player, values.drawState, this.ServicesLocator);
			EventObject.run();
		});

		var timestamp = this.ServicesLocator.get('Helper').getTimestamp(settings.updateMainRoom);
		var UpdateMainRoomTaskObject = new UpdateMainRoomTask(timestamp, this.ServicesLocator.get('EventsManager'));
		this.ServicesLocator.get('TaskManager').add(UpdateMainRoomTaskObject);

		this.io.sockets.on('connection', (socket) => {
			if ( socket.handshake.headers.origin !== settings.origin ) {
				socket.disconnect();
			}

			var SocketControllerObject = new SocketController(socket, this.ServicesLocator);
			SocketControllerObject.setID(socket.id);
			
			this.ServicesLocator.get('SocketsManager').add(SocketControllerObject);

			socket.on('disconnect', (data) => {
				this.ServicesLocator.get('SocketsManager').remove(SocketControllerObject);

				var PlayerObject = this.ServicesLocator.get('PlayersManager').get(SocketControllerObject.getPlayerID());

				if ( !PlayerObject ) {
					return false;
				}

				if ( PlayerObject.getRoomID() ) {
					var RoomObject = this.ServicesLocator.get('RoomsManager').get(PlayerObject.getRoomID());

					if ( RoomObject ) {
						this.ServicesLocator.get('EventsManager').triggerEvent('playerLeaveRoom', {
							Room: RoomObject,
							Player: PlayerObject
						});
					}
				} else {
					var MainRoomObject = this.ServicesLocator.get('MainRoomManager');
					MainRoomObject.remove(PlayerObject);
				}

				this.ServicesLocator.get('PlayersManager').remove(PlayerObject);
			});
		});
	}
}

module.exports = App;