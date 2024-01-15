var crypto = require('crypto');

class Helper {
	constructor() {
		this.int = 0;
	}

	generatePlayerID() {
		this.int++;
		var microtime = process.hrtime();

		return crypto.createHash('md5').update('playerid' + this.int + microtime[0] + microtime[1]).digest('hex');
	}

	generateRoomID() {
		this.int++;
		var microtime = process.hrtime();

		return crypto.createHash('md5').update('roomid' + this.int + microtime[0] + microtime[1]).digest('hex');
	}

	generatePlayerSecretCode(Player) {
		var microtime = process.hrtime();

		return crypto.createHash('md5').update('secretcode' + Player.getID() + microtime[0] + microtime[1]).digest('hex');
	}

	generateTaskID() {
		this.int++;

		return 'task' + this.int;
	}

	getTimestamp(add = 0) {
		return parseInt(Date.now() / 1000) + add;
	}

	getRandom(min, max) {
	  return Math.floor(Math.random() * (max - min) + min);
	}
}

module.exports = Helper;