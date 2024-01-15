class Room extends Entity {
	constructor() {
		super();

		this.players = {};
		this.admin = false;
		this.drawer = false;
		this.roundStarted = false;

		this.StartGameTimer = new StartGameTimer(0);
		this.SelectWordTimer = new RoundTimer(0);
		this.RoundTimer = new RoundTimer(0);
		this.drawStateUpdaterID;

		this.word;
		this.words;
		this.maxPlayers;
		this.playersCount;
		this.maxRounds;
		this.lang;
		this.difficulty;
		this.round;
		this.status;
	}

	setData(data) {
		for ( var name in data ) {
			if ( this['set' + name[0].toUpperCase() + name.substr(1)] !== undefined ) {
				this['set' + name[0].toUpperCase() + name.substr(1)](data[name]);
			}
		}
	}

	clear() {
		this.StartGameTimer.stop();
		this.SelectWordTimer.stop();
		this.RoundTimer.stop();
		this.clearSocketDrawUpdater();
		this.drawStateUpdaterID = undefined;

		this.players = {};
		this.playersCount = undefined;
		this.admin = false;
		this.drawer = false;
		this.roundStarted = false;
		this.word = undefined;
		this.words = undefined;
		this.maxPlayers = undefined;
		this.maxRounds = undefined;
		this.lang = undefined;
		this.difficulty = undefined;
		this.round = undefined;
		this.status = undefined;
	}

	setSocketDrawUpdaterID(id) {
		this.drawStateUpdaterID = id;
	}

	clearSocketDrawUpdater() {
		clearInterval(this.drawStateUpdaterID);
	}

	setWord(word) {
		this.word = word;
	}

	getWord() {
		return this.word;
	}

	setWords(words) {
		this.words = words;
	}

	getWords() {
		return this.words;
	}

	setAdmin(id) {
		this.admin = id;
	}

	getAdmin() {
		return ( this.admin !== false ) ? this.admin : false;
	}

	isAdmin(id) {
		return this.getAdmin() == id;
	}

	setDrawer(id) {
		this.drawer = id;
	}

	getDrawer() {
		return ( this.drawer !== false ) ? this.drawer : false;
	}

	isDrawer(id) {
		return this.getDrawer() == id;
	}

	getPlayers() {
		return this.players;
	}

	getPlayer(id) {
		return this.players[id];
	}

	addPlayer(player) {
		this.players[player.id] = player;
	}

	removePlayer(id) {
		delete this.players[id];
	}

	setPlayers(players) {
		this.players = players;
	}

	setRound(round) {
		this.round = round;
	}

	getRound() {
		return this.round;
	}

	setStatus(status) {
		this.status = status;
	}

	getStatus() {
		return this.status;
	}

	setLang(lang) {
		this.lang = lang;
	}

	getLang() {
		return this.lang;
	}

	setDifficulty(difficulty) {
		this.difficulty = difficulty;
	}

	getDifficulty() {
		return this.difficulty;
	}

	getPlayersCount() {
		return Object.keys(this.players).length;
	}

	setMaxPlayers(value) {
		this.maxPlayers = value;
	}

	getMaxPlayers() {
		return this.maxPlayers;
	}

	setPlayersCount(value) {
		this.playersCount = value;
	}

	getPlayersCount() {
		return this.playersCount;
	}

	isFull() {
		return this.getPlayersCount() == this.getMaxPlayers();
	}

	getMaxRounds() {
		return this.maxRounds;
	}

	setMaxRounds(value) {
		this.maxRounds = value;
	}

	setRoundStarted(value) {
		this.roundStarted = value;
	}

	getRoundStarted() {
		return this.roundStarted;
	}

	getStartGameTimer() {
		return this.StartGameTimer;
	}

	getSelectWordTimer() {
		return this.SelectWordTimer;
	}

	getRoundTimer() {
		return this.RoundTimer;
	}
}