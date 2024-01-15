var Player = require('../Entities/Player');
var PlayerManager = require('../Managers/PlayerManager');
var Room = require('../Entities/Room');
var RoomManager = require('../Managers/RoomManager');
var StartGameTask = require('../Tasks/StartGameTask');
var UpdateRoomTask = require('../Tasks/UpdateRoomTask');

class ObjectsCreator {
	constructor(ServicesLocator) {
		this.ServicesLocator = ServicesLocator;
	}

	player(data) {
		var PlayerObject = new Player(data.socketID);
		PlayerObject.setNickname(data.nickname);
		PlayerObject.setID(this.ServicesLocator.get('Helper').generatePlayerID());
		PlayerObject.setSecretCode(this.ServicesLocator.get('Helper').generatePlayerSecretCode(PlayerObject));

	  return PlayerObject;
	}

	room(data, Player) {
		var RoomObject = new Room();

		RoomObject.setMaxPlayers(data.maxPlayers);
		RoomObject.setMaxRounds(data.maxRounds);
		RoomObject.setLang(data.lang);
		RoomObject.setID(this.ServicesLocator.get('Helper').generateRoomID());
		RoomObject.addPlayer(Player);
		RoomObject.setAdmin(Player);
		RoomObject.setPrivate(data.private);

		var timestamp = this.ServicesLocator.get('Helper').getTimestamp(settings.startGameTime);
		RoomObject.setStartTimestamp(timestamp);
		var StartGameTaskObject = new StartGameTask(timestamp, RoomObject, this.ServicesLocator.get('EventsManager'));
		RoomObject.setStartGameTask(StartGameTaskObject);
		this.ServicesLocator.get('TaskManager').add(StartGameTaskObject);

		var timestamp = this.ServicesLocator.get('Helper').getTimestamp(settings.updateRoom);
		var UpdateRoomTaskObject = new UpdateRoomTask(timestamp, RoomObject, this.ServicesLocator.get('EventsManager'));
		RoomObject.setUpdateRoomTask(UpdateRoomTaskObject);
		this.ServicesLocator.get('TaskManager').add(UpdateRoomTaskObject);

		return RoomObject;
	}

	playerManager(Player) {
		var PlayerManagerObject = new PlayerManager(Player);

		return PlayerManagerObject;
	}

	roomManager(Room) {
		var RoomManagerObject = new RoomManager(Room, this.ServicesLocator.get('PlayersManager'));

		return RoomManagerObject;
	}
}

module.exports = ObjectsCreator;