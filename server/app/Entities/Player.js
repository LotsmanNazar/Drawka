var Entity = require('./Entity');

class Player extends Entity {
	constructor(socketID) {
		super();

		this.socketID = socketID;
		this.nickname;
		this.roomID;
		this.secretCode;
		this.points = 0;
	}

	setSocketID(socketID) {
		this.socketID = socketID;
	}

	getSocketID() {
		return this.socketID;
	}

	setNickname(nickname) {
		this.nickname = nickname;
	}

	getNickname() {
		return this.nickname;
	}

	setRoomID(ID) {
		this.roomID = ID;
	}

	getRoomID() {
		return this.roomID;
	}

	addToPoints(value) {
		this.points += value;
	}

	getPoints() {
		return this.points;
	}

	clearPoints() {
		this.points = 0;
	}

	setSecretCode(secretCode) {
		this.secretCode = secretCode;
	}

	getSecretCode() {
		return this.secretCode;
	}
}

module.exports = Player;