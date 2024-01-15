class RoundStartedResponse extends SocketResponse {
	constructor(ServicesLocator, data) {
		super(ServicesLocator, data);
	}

	run() {
		var VueObject = this.ServicesLocator.get('Vue');
		var DrawControllerObject = this.ServicesLocator.get('DrawController');
		var ChatControllerObject = this.ServicesLocator.get('ChatController');
		var RequestControllerObject = this.ServicesLocator.get('SocketController').getRequestController();
		var PlayerObject = this.ServicesLocator.get('PlayersManager').getCurrentPlayer();
		var RoomObject = this.ServicesLocator.get('RoomsManager').getCurrentRoom();

		RoomObject.setData(this.data.room);
		RoomObject.getRoundTimer().setTime(this.data.timer);

		DrawControllerObject.init();
		DrawControllerObject.stopUpdate();
		RoomObject.clearSocketDrawUpdater();

		if ( RoomObject.isDrawer(PlayerObject.getID()) ) {
			var intervalID = RequestControllerObject.drawState({
				roomID: RoomObject.getID(),
				playerID: PlayerObject.getID()
			}, DrawControllerObject.getModel());

			RoomObject.setSocketDrawUpdaterID(intervalID);
		} else {
			DrawControllerObject.startUpdate();
		}

		VueObject.updateCurrentRoom({...RoomObject});

		ChatControllerObject.newMessage('roundStarted', {'%round%': RoomObject.getRound()});
	}
}