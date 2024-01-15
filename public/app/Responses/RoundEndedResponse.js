class RoundEndedResponse extends SocketResponse {
	constructor(ServicesLocator, data) {
		super(ServicesLocator, data);
	}

	run() {
		var VueObject = this.ServicesLocator.get('Vue');
		var DrawControllerObject = this.ServicesLocator.get('DrawController');
		var ChatControllerObject = this.ServicesLocator.get('ChatController');
		var RoomsManagerObject = this.ServicesLocator.get('RoomsManager');
		var RoomObject = RoomsManagerObject.getCurrentRoom();
		var drawer = RoomObject.getPlayer(this.data.drawer.id);

		RoomObject.setData(this.data.room);

		if ( drawer ) {
			drawer.points = this.data.drawer.points;
		}
		
		DrawControllerObject.stopUpdate();
		DrawControllerObject.init();
		RoomObject.clearSocketDrawUpdater();
		VueObject.updateCurrentRoom({...RoomObject});

		ChatControllerObject.newMessage('roundEnded');
		ChatControllerObject.newMessage('roundEnded2', {'%word%': this.data.word});
	}
}