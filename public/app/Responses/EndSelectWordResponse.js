class EndSelectWordResponse extends SocketResponse {
	constructor(ServicesLocator, data) {
		super(ServicesLocator, data);
	}

	run() {
		var VueObject = this.ServicesLocator.get('Vue');
		var ChatControllerObject = this.ServicesLocator.get('ChatController');
		var RoomObject = this.ServicesLocator.get('RoomsManager').getCurrentRoom();

		RoomObject.setData(this.data.room);
		RoomObject.setWords(undefined);
		VueObject.updateCurrentRoom({...RoomObject});

		var drawer = RoomObject.getPlayer(RoomObject.getDrawer());

		ChatControllerObject.newMessage('endSelectWord', {'%nickname%': drawer.nickname});
	}
}