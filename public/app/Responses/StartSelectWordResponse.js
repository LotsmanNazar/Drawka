class StartSelectWordResponse extends SocketResponse {
	constructor(ServicesLocator, data) {
		super(ServicesLocator, data);
	}

	run() {
		var VueObject = this.ServicesLocator.get('Vue');
		var ChatControllerObject = this.ServicesLocator.get('ChatController');
		var RoomObject = this.ServicesLocator.get('RoomsManager').getCurrentRoom();

		RoomObject.setData(this.data.room);
		RoomObject.setWord(undefined);
		RoomObject.getStartGameTimer().setTime(this.data.timer);
		VueObject.updateCurrentRoom({...RoomObject});

		var drawer = RoomObject.getPlayer(RoomObject.getDrawer());

		ChatControllerObject.newMessage('startSelectWord', {'%nickname%': drawer.nickname});
	}
}