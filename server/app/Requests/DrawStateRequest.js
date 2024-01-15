var RequestHandler = require('./RequestHandler');

class DrawStateRequest extends RequestHandler {
	constructor(data, ServicesLocator) {
		super(data, ServicesLocator);
	}

	validate() {

		if ( this.data.drawState === undefined || typeof(this.data.drawState) != 'object' || this.data.drawState[0] === undefined ) {
			return false;
		}

		this.data.drawState.splice(1000, this.data.drawState.length - 1000);

		var error = false;
		for ( var i = 0; i < this.data.drawState.length; i++ ) {
			var item = this.data.drawState[i];

			if ( item.length != 5 ) {
				error = true;
				break;
			}
		}

		if ( error ) {
			return false;
		}

		return true;
	}

	handle() {
		if ( !this.validate() ) {
			return {
				error: true,
				emit: false
			}
		}

		var playerDefined = this.playerDefined(true);
		if ( playerDefined ) {
			return playerDefined;
		}

		var roomDefined = this.roomDefined(true);
		if ( roomDefined ) {
			return roomDefined;
		}

		if (
			this.Room.getStatus() != 'started' ||
			!this.Room.getRoundStarted() ||
			this.Room.getDrawer() != this.Player.getID()
		) {
			return {
				error: true,
				emit: false
			}
		}

		this.ServicesLocator.get('EventsManager').triggerEvent('drawState', {
			Room: this.Room,
			Player: this.Player,
			drawState: this.data.drawState
		});

		return {
			emit: false
		}
	}
}

module.exports = DrawStateRequest;