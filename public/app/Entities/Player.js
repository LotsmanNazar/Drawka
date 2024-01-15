class Player extends Entity {
	constructor() {
		super();

		this.nickname;
		this.secretCode;
	}

	setNickname(nickname) {
		this.nickname = nickname
	}

	getNickname() {
		return this.nickname;
	}

	setSecretCode(secretCode) {
		this.secretCode = secretCode;
	}

	getSecretCode() {
		return this.secretCode;
	}
}