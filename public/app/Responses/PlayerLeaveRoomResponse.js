class PlayerLeaveRoomResponse extends SocketResponse {
	constructor(ServicesLocator, data) {
		super(ServicesLocator, data);
	}

	run() {
		var VueObject = this.ServicesLocator.get('Vue');
		var ChatControllerObject = this.ServicesLocator.get('ChatController');
		var RoomsManagerObject = this.ServicesLocator.get('RoomsManager');
		var RoomObject = RoomsManagerObject.getCurrentRoom();
		var playerData = this.data.player[Object.keys(this.data.player)[0]];

		RoomObject.setData(this.data.room);
		RoomObject.removePlayer(playerData.id);
		VueObject.updateCurrentRoom({...RoomObject});

		ChatControllerObject.newMessage('playerLeaveRoom', {'%nickname%': playerData.nickname});
	}
}