class DisconnectResponse extends SocketResponse {
	constructor(ServicesLocator, data) {
		super(ServicesLocator, data);
	}

	run() {
		var DrawControllerObject = this.ServicesLocator.get('DrawController');
		var RoomsManagerObject = this.ServicesLocator.get('RoomsManager');
		var RoomObject = RoomsManagerObject.getCurrentRoom();
		var VueObject = this.ServicesLocator.get('Vue');
		var RouteObject = this.ServicesLocator.get('Route');

		DrawControllerObject.stopUpdate();
		RoomObject.clearSocketDrawUpdater();

		if ( !VueObject.getDisconectStatus() ) {
			VueObject.setErrorMessage('Lost connection to server.');
			RouteObject.redirect('pageError');
			VueObject.setDisconectStatus(true)
		}
	}
}