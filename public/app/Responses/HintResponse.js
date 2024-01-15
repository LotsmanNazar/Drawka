class HintResponse extends SocketResponse {
	constructor(ServicesLocator, data) {
		super(ServicesLocator, data);
	}

	run() {
		var ChatControllerObject = this.ServicesLocator.get('ChatController');
		var VueObject = this.ServicesLocator.get('Vue');
		var RoomObject = this.ServicesLocator.get('RoomsManager').getCurrentRoom();

		RoomObject.setData(this.data.room);
		VueObject.updateCurrentRoom({...RoomObject});

		var word = this.data.room.word;
		var wordStr = '';

		for ( var i = 0; i < word.length; i++ ) {
			wordStr += ( word[i] ) ? word[i] + ' ' : '- ';
		}

		ChatControllerObject.newMessage('hint', {'%word%': wordStr});
	}
}