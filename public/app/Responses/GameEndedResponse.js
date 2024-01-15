class GameEndedResponse extends SocketResponse {
	constructor(ServicesLocator, data) {
		super(ServicesLocator, data);
	}

	run() {
		var VueObject = this.ServicesLocator.get('Vue');
		var ChatControllerObject = this.ServicesLocator.get('ChatController');
		var DrawControllerObject = this.ServicesLocator.get('DrawController');
		var RouteObject = this.ServicesLocator.get('Route');
		var RoomsManagerObject = this.ServicesLocator.get('RoomsManager');
		var RoomObject = RoomsManagerObject.getCurrentRoom();

		RoomObject.setData(this.data.room);
		DrawControllerObject.stopUpdate();
		RoomObject.clearSocketDrawUpdater();

		var players = RoomObject.getPlayers();
		var playersNewOrder = {};

		var points = [];
		for ( var id in players ) {
			points.push(players[id].points)
		}

		points.sort( function(a,b) {
			return a - b
		}).reverse();

		for ( var i = 0; i < points.length; i++ ) {
			for ( var id in players ) {
				if ( players[id].points == points[i] ) {
					playersNewOrder[id] = players[id];
				}
			}
		}

		RoomObject.setPlayers(playersNewOrder);

		VueObject.updateCurrentRoom({...RoomObject});

		ChatControllerObject.newMessage('gameEnded');

		setTimeout( () => {
			RouteObject.redirect('pageEndGame');
			ChatControllerObject.clearChat();
			RoomsManagerObject.clearCurrentRoom();
			// VueObject.updateCurrentRoom({...RoomObject});
		}, 5000);
	}
}