class GameStartedResponse extends SocketResponse {
	constructor(ServicesLocator, data) {
		super(ServicesLocator, data);
	}

	run() {
		var VueObject = this.ServicesLocator.get('Vue');
		var RoomsManagerObject = this.ServicesLocator.get('RoomsManager');
		var ChatControllerObject = this.ServicesLocator.get('ChatController');
		var RoomObject = RoomsManagerObject.getCurrentRoom();

		RoomObject.setData(this.data.room);
		VueObject.updateCurrentRoom({...RoomObject});
		ChatControllerObject.newMessage('gameStarted');
	}
}