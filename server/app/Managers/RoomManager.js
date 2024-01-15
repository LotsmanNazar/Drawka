var EntityManager = require('./EntityManager');
var words = require('../words.js');

class RoomManager extends EntityManager {
	constructor(Room, PlayersManager) {
		super(Room);

		this.PlayersManager = PlayersManager;
	}

	getDataToSend() {
		var data = {};
		var players = this.Entity.getPlayers();

		data.players = this.getPlayersData(players);
		data.ID = this.Entity.getID();
		data.admin = this.Entity.getAdmin();
		data.drawer = this.Entity.getDrawer();
		data.drawState = this.Entity.getDrawState();

		data.maxPlayers = this.Entity.getMaxPlayers();
		data.playersCount = this.Entity.getPlayersCount();
		data.maxRounds = this.Entity.getMaxRounds();
		data.lang = this.Entity.getLang();
		data.difficulty = this.Entity.getDifficulty();
		data.round = this.Entity.getRound();
		data.status = this.Entity.getStatus();
		data.roundStarted = this.Entity.getRoundStarted();
		data.word = ( this.Entity.getWord() ) ? this.getWordSecret() : undefined;

		return data;
	}

	getPlayerData(Player) {
		var data = {
			id: Player.getID(),
			nickname: Player.getNickname(),
			points: Player.getPoints()
		};

		return data;
	}

	getPlayersData(players) {
		var data = {};

		for ( var i = 0; i < players.length; i++ ) {
			var PlayerObject = ( players[i].constructor.name != 'Player' ) ? this.PlayersManager.get(players[i]) : players[i];
			data[PlayerObject.getID()] = this.getPlayerData(PlayerObject);
		}

		return data;
	}

	getDataRoomsList() {
		var data = {
			ID: this.Entity.getID(),
			status: this.Entity.getStatus(),
			round: this.Entity.getRound(),
			maxRounds: this.Entity.getMaxRounds(),
			playersCount: this.Entity.getPlayersCount(),
			maxPlayers: this.Entity.getMaxPlayers(),
			lang: this.Entity.getLang(),
			difficulty: this.Entity.getDifficulty()
		}

		return data;
	}

	getDataRoundDrawer() {
		var data = {
			word: this.Entity.getWord(),
			drawer: this.Entity.getDrawer()
		}

		return data;
	}

	getDataRound() {
		var data = {
			wordLength: this.Entity.getWord().length,
			drawer: this.Entity.getDrawer()
		}

		return data;
	}

	getWords(Helper) {
		var wordsID = [...new Array(12)].map( () => {
			return Helper.getRandom(0, words[this.Entity.getLang()].length - 1);
		});

		var wordsList = [];
		for ( var i = 0; i < wordsID.length; i++ ) {
			var word = words[this.Entity.getLang()][wordsID[i]];

			if ( wordsList.indexOf(word) == -1 ) {
				wordsList.push(word);
			}
		}

		this.Entity.setWords(wordsList);

		return this.Entity.getWords();
	}

	getWordSecret() {
		var hint = this.Entity.getWordHint();
		var length = this.Entity.getWord().length;
		var word = [...new Array(length)].map( () => {
			return '';
		});

		if ( hint.length == 2 ) {
			word[hint[0]] = this.Entity.getWord()[hint[0]];
			word[hint[1]] = this.Entity.getWord()[hint[1]];
		}

		return word;
	}

	getStartTimer(Helper) {
		var different = Math.abs(this.Entity.getStartTimestamp() - Helper.getTimestamp());

		return different;
	}

	getRoundStartTimer(Helper) {
		var different = Math.abs(this.Entity.getStartRoundTimestamp() - Helper.getTimestamp());

		return different;
	}

	getRoundEndTimer(Helper) {
		var different = Math.abs(this.Entity.getEndRoundTimestamp() - Helper.getTimestamp());

		return different;
	}

	setHint(Helper) {
		var length = this.Entity.getWord().length - 1;
		var hint = [Helper.getRandom(0, length), Helper.getRandom(0, length)];

		this.Entity.setWordHint(hint);
	}

	chooseWord() {
		var words = this.Entity.getWords();
		var word = words[0];

		this.Entity.setWord(word);

		return word;
	}

	chooseDrawer() {
		var players = this.Entity.getPlayers();

		if ( !players.length ) {
			return false;
		}

		var currentIndex = ( this.Entity.getDrawer() !== false ) ? players.indexOf(this.Entity.getDrawer()) : -1;
		var nextIndex = currentIndex + 1;
		var nextPlayer = ( players[nextIndex] !== undefined ) ? players[nextIndex] : players[0];
		var PlayerObject = this.PlayersManager.get(nextPlayer);

		this.Entity.setDrawer(PlayerObject);

		return PlayerObject;
	}

	chooseAdmin() {
		var players = this.Entity.getPlayers();

		if ( !players.length ) {
			return false;
		}

		var currentIndex = players.indexOf(this.Entity.getAdmin());
		var nextIndex = currentIndex + 1;
		var nextPlayer = ( players[nextIndex] !== undefined ) ? players[nextIndex] : players[0];
		var PlayerObject = this.PlayersManager.get(nextPlayer);

		this.Entity.setAdmin(PlayerObject);

		return PlayerObject;
	}
}

module.exports = RoomManager;