class CreateRoomResponse extends SocketResponse {
	constructor(ServicesLocator, data) {
		super(ServicesLocator, data);
	}

	run() {
		var VueObject = this.ServicesLocator.get('Vue');
		var RoomObject = this.ServicesLocator.get('RoomsManager').getCurrentRoom();
		var ChatControllerObject = this.ServicesLocator.get('ChatController');
		var DrawControllerObject = this.ServicesLocator.get('DrawController');
		var RouteObject = this.ServicesLocator.get('Route');

		if ( this.data.error ) {
			VueObject.setErrorMessage(this.data.message);
			RouteObject.redirect('pageError');

			return false;
		}

		RoomObject.setData(this.data.room);
		RoomObject.getStartGameTimer().setTime(this.data.timer);
		VueObject.updateCurrentRoom({...RoomObject});

		RouteObject.setLocationParameter('roomid', RoomObject.getID());
		RouteObject.redirect('pageRoom');

		ChatControllerObject.newMessage('roomCreated1');
		ChatControllerObject.newMessage('roomCreated2', {'%link%': window.location.href});
		ChatControllerObject.newMessage('roomCreated3');

		DrawControllerObject.init();
	}
}