var Event = require('./Event');

class DrawStateEvent extends Event {
	constructor(Room, Player, drawState, ServicesLocator) {
		super();

		this.ServicesLocator = ServicesLocator;
		this.Room = Room;
		this.Player = Player;
		this.drawState = drawState;
	}

	run() {
		var RoomManagerObject = this.ServicesLocator.get('ObjectsCreator').roomManager(this.Room);
		var players = this.Room.getPlayers();

		this.Room.addToDrawState(this.drawState);

		var SocketsManagerObject = this.ServicesLocator.get('SocketsManager');
		SocketsManagerObject.updatePlayers(this.ServicesLocator.get('PlayersManager'), players, 'drawState', {
			error: false,
			drawState: this.drawState
		}, [this.Player.getID()]);
	}
}

module.exports = DrawStateEvent;