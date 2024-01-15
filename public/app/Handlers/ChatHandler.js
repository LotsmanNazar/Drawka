class ChatHandler {
	constructor(ServicesLocator) {
		this.ServicesLocator = ServicesLocator;
		this.ChatController = this.ServicesLocator.get('ChatController');

		this.init();
	}

	init() {
		this.ChatController.onSubmit = (form) => {
			this.onSubmit(form);
		}
	}

	onSubmit(form) {
		var RoomObject = this.ServicesLocator.get('RoomsManager').getCurrentRoom();
		var RequestControllerObject = this.ServicesLocator.get('SocketController').getRequestController();
		var ChatControllerObject = this.ServicesLocator.get('ChatController');
		var RoomObject = this.ServicesLocator.get('RoomsManager').getCurrentRoom();

		var wordField = form.getElementsByClassName('game-chat-field')[0];
		var word = wordField.value;

		if ( !word ) {
			return false;
		}

		if ( word.length != RoomObject.getWord().length ) {
			ChatControllerObject.newMessage('wordError', {'%length%': RoomObject.getWord().length});
			this.clear(wordField);

			return false;
		}

		RequestControllerObject.chatMessage({
			roomID: RoomObject.getID(),
			word: word
		});

		this.clear(wordField);
	}

	clear(field) {
		field.value = '';
	}
}