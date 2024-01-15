var Entity = require('./Entity');

class Room extends Entity {
	constructor() {
		super();

		this.players = [];
		this.admin = false;
		this.drawer = false;
		this.startTimestamp;
		this.startRoundTimestamp;
		this.endRoundTimestamp;
		this.roundStarted = false;

		this.startGameTask;
		this.endSelectWordTask;
		this.endRoundTask;
		this.updateRoomTask;
		this.hintTask;

		this.drawState = [];

		this.word;
		this.wordHint = [];
		this.words;
		this.maxPlayers;
		this.maxRounds;
		this.lang;
		this.difficulty;
		this.round = 0;
		this.status = 'not-started';

		this.private = 'no';
	}

	setPrivate(value) {
		this.private = value;
	}

	isPrivate() {
		if ( this.private == 'yes' ) {
			return true;
		}

		return false;
	}

	setWord(word) {
		this.word = word;
	}

	getWord() {
		return this.word;
	}

	setWordHint(hint) {
		this.wordHint = hint;
	}

	getWordHint() {
		return this.wordHint;
	}

	setWords(words) {
		this.words = words;
	}

	getWords() {
		return this.words;
	}

	setAdmin(Player) {
		this.admin = Player.getID();
	}

	getAdmin() {
		return ( this.admin !== false ) ? this.admin : false;
	}

	isAdmin(Player) {
		return this.getAdmin() === Player.getID();
	}

	setDrawer(Player) {
		this.drawer = Player.getID();
	}

	getDrawer() {
		return ( this.drawer !== false ) ? this.drawer : false;
	}

	isDrawer(Player) {
		return this.getDrawer() === Player.getID();
	}

	getPlayers() {
		return this.players;
	}

	addPlayer(Player) {
		this.players.push(Player.getID());
		Player.setRoomID(this.getID());
	}

	removePlayer(Player) {
		if ( Player.getID() == this.admin ) {
			// this.admin = false;
		}

		if ( Player.getID() == this.drawer ) {
			// this.drawer = false;
		}

		var index = this.players.indexOf(Player.getID());

		if ( index != -1 ) {
			this.players.splice(index, 1);
			Player.setRoomID(undefined);
		}
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

	addToDrawState(state) {
		this.drawState = this.drawState.concat(state);
	}

	clearDrawState() {
		this.drawState = [];
	}

	getDrawState() {
		return this.drawState;
	}

	getPlayersCount() {
		return this.players.length;
	}

	setMaxPlayers(value) {
		this.maxPlayers = value;
	}

	getMaxPlayers() {
		return this.maxPlayers;
	}

	getMaxRounds() {
		return this.maxRounds;
	}

	setMaxRounds(value) {
		this.maxRounds = value;
	}

	setStartTimestamp(timestamp) {
		this.startTimestamp = timestamp;
	}

	getStartTimestamp() {
		return this.startTimestamp;
	}

	setStartRoundTimestamp(timestamp) {
		this.startRoundTimestamp = timestamp;
	}

	getStartRoundTimestamp() {
		return this.startRoundTimestamp;
	}

	setEndRoundTimestamp(timestamp) {
		this.endRoundTimestamp = timestamp;
	}

	getEndRoundTimestamp() {
		return this.endRoundTimestamp;
	}

	setRoundStarted(value) {
		this.roundStarted = value;
	}

	getRoundStarted() {
		return this.roundStarted;
	}

	setStartGameTask(Task) {
		this.startGameTask = Task;
	}

	getStartGameTask() {
		return this.startGameTask;
	}

	clearStartGameTask(TaskManager) {
		TaskManager.remove(this.startGameTask);
		this.startGameTask = undefined;
	}

	setEndSelectWordTask(Task) {
		this.endSelectWordTask = Task;
	}

	getEndSelectWordTask() {
		return this.endSelectWordTask;
	}

	clearEndSelectWordTask(TaskManager) {
		TaskManager.remove(this.endSelectWordTask);
		this.endSelectWordTask = undefined;
	}

	setEndRoundTask(Task) {
		this.endRoundTask = Task;
	}

	getEndRoundTask() {
		return this.endRoundTask;
	}

	clearEndRoundTask(TaskManager) {
		TaskManager.remove(this.endRoundTask);
		this.endRoundTask = undefined;
	}

	setUpdateRoomTask(Task) {
		this.updateRoomTask = Task;
	}

	getUpdateRoomTask() {
		return this.updateRoomTask;
	}

	clearUpdateRoomTask(TaskManager) {
		TaskManager.remove(this.updateRoomTask);
		this.updateRoomTask = undefined;
	}

	setHintTask(Task) {
		this.hintTask = Task;
	}

	getHintTask() {
		return this.hintTask;
	}

	clearHintTask(TaskManager) {
		TaskManager.remove(this.hintTask);
		this.hintTask = undefined;
	}

	checkStatus() {
		if ( !this.startTimer.isActive() ) {
			this.status = 'started';
		}
	}

	playerInRoom(Player) {
		if ( this.players.indexOf(Player.getID()) != -1 ) {
			return true;
		} else {
			return false;
		}
	}
}

module.exports = Room;