class EnterInRoomResponse extends SocketResponse {
	constructor(ServicesLocator, data) {
		super(ServicesLocator, data);
	}

	run() {
		var VueObject = this.ServicesLocator.get('Vue');
		var RouteObject = this.ServicesLocator.get('Route');
		var RoomsManagerObject = this.ServicesLocator.get('RoomsManager');
		RoomsManagerObject.clear();

		if ( this.data.error ) {
			RouteObject.clearLocationParameters();
			VueObject.setErrorMessage(this.data.message);
			RouteObject.redirect('pageError');

			return false;
		}

		var RoomObject = RoomsManagerObject.getCurrentRoom();
		var PlayerObject = this.ServicesLocator.get('PlayersManager').getCurrentPlayer();
		var RouteObject = this.ServicesLocator.get('Route');
		var ChatControllerObject = this.ServicesLocator.get('ChatController');
		var DrawControllerObject = this.ServicesLocator.get('DrawController');

		DrawControllerObject.init();
		DrawControllerObject.getModel().addToDrawState(this.data.room.drawState);
		RoomObject.setData(this.data.room);

		if ( RoomObject.getStatus() == 'not-started' ) {
			RoomObject.getStartGameTimer().setTime(this.data.timer);
		}

		if ( RoomObject.getStatus() == 'started' ) {
			if ( RoomObject.getRoundStarted() ) {
				RoomObject.getRoundTimer().setTime(this.data.timer);

				if ( !RoomObject.isDrawer(PlayerObject.getID()) ) {
					DrawControllerObject.getDrawUpdater().setSpeed(10);
					DrawControllerObject.startUpdate();
				}
			} else {
				RoomObject.getStartGameTimer().setTime(this.data.timer);
			}
		}

		VueObject.updateCurrentRoom({...RoomObject});

		RouteObject.setLocationParameter('roomid', RoomObject.getID());
		RouteObject.redirect('pageRoom');

		ChatControllerObject.newMessage('enterInRoom1');
		ChatControllerObject.newMessage('enterInRoom2', {'%link%': window.location.href});
	}
}