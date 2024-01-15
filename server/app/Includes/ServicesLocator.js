var Helper = require('./Helper');
var ObjectsCreator = require('./ObjectsCreator');
var SocketsManager = require('../Managers/SocketsManager');
var PlayersManager = require('../Managers/PlayersManager');
var RoomsManager = require('../Managers/RoomsManager');
var MainRoomManager = require('../Managers/MainRoomManager');
var TaskManager = require('../Managers/TaskManager');
var EventsManager = require('../Managers/EventsManager');

class ServicesLocator {
	constructor() {
		this.services = {
			'Helper': new Helper(),
			'ObjectsCreator': new ObjectsCreator(this),
			'SocketsManager': new SocketsManager(),
			'PlayersManager': new PlayersManager(),
			'RoomsManager': new RoomsManager,
			'MainRoomManager': new MainRoomManager(),
			'TaskManager': new TaskManager(this),
			'EventsManager': new EventsManager()
		};
	}

	get(name) {
		return this.services[name];
	}
}

module.exports = ServicesLocator;