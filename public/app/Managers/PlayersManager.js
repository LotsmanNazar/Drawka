class PlayersManager {
	constructor() {
		this.plyers = {};
		this.CurrentPlayer = new Player();
	}

	add(Player) {
		this.plyers[Player.getID()] = Player;
	}

	get(id) {
		return this.plyers[id];
	}

	remove(name) {
		delete this.plyers[id];
	}

	clear() {
		this.plyers = {};
	}

	getCurrentPlayer() {
		return this.CurrentPlayer;
	}
}