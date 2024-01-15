class UserEnterResponse extends SocketResponse {
	constructor(ServicesLocator, data) {
		super(ServicesLocator, data);
	}

	run() {
		var VueObject = this.ServicesLocator.get('Vue');
		var RouteObject = this.ServicesLocator.get('Route');
		var RequestControllerObject = this.ServicesLocator.get('SocketController').getRequestController();
		var PlayerObject = this.ServicesLocator.get('PlayersManager').getCurrentPlayer();
		var CookiesManagerObject = this.ServicesLocator.get('CookiesManager');
		var RoomsManagerObject = this.ServicesLocator.get('RoomsManager');
		var LocalStorageManagerObject = this.ServicesLocator.get('LocalStorageManager');

		if ( this.data.error ) {
			VueObject.setErrorMessage(this.data.message);

			if ( this.data.wrongNickname ) {
				CookiesManagerObject.remove('nickname');
			}
			
			return false;
		}

		LocalStorageManagerObject.add('DrawkaOnlineSocket', window.performance.now());

		for ( var id in this.data.rooms ) {
			var RoomObject = new Room();
			RoomObject.setData(this.data.rooms[id]);
			RoomsManagerObject.add(RoomObject);
		}

		VueObject.updateRooms({...RoomsManagerObject.getAll()});

		PlayerObject.setID(this.data.playerID);
		PlayerObject.setSecretCode(this.data.secretCode);
		VueObject.updatePlayer({...PlayerObject});

		var roomID = RouteObject.getURLParameter('roomid');

		if ( roomID ) {
			RequestControllerObject.enterInRoom({
				roomID: roomID,
				playerID: PlayerObject.getID()
			});
		} else {
			RouteObject.clearLocationParameters();
			RouteObject.redirect('pageRooms');
		}
	}
}