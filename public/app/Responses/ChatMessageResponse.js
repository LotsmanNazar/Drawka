class ChatMessageResponse extends SocketResponse {
	constructor(ServicesLocator, data) {
		super(ServicesLocator, data);
	}

	run() {
		var VueObject = this.ServicesLocator.get('Vue');
		var ChatControllerObject = this.ServicesLocator.get('ChatController');
		var RoomsManagerObject = this.ServicesLocator.get('RoomsManager');
		var RoomObject = RoomsManagerObject.getCurrentRoom();

		RoomObject.getPlayer(this.data.player.id).points = this.data.player.points;
		VueObject.updateCurrentRoom({...RoomObject});
		ChatControllerObject.newMessage('chatMessage1', {'%nickname%': this.data.player.nickname, '%word%': this.data.word});

		if ( this.data.guessed ) {
			ChatControllerObject.newMessage('chatMessage2', {'%nickname%': this.data.player.nickname});
		} else {
			ChatControllerObject.newMessage('chatMessage3', {'%nickname%': this.data.player.nickname});
		}
	}
}