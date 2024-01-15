class UserDisconnectResponse extends SocketResponse {
	constructor(ServicesLocator, data) {
		super(ServicesLocator, data);
	}

	run() {
		var VueObject = this.ServicesLocator.get('Vue');
		var RouteObject = this.ServicesLocator.get('Route');

		VueObject.setDisconectStatus(true);

		if ( this.data.message !== false ) {
			RouteObject.redirect('pageError');
			VueObject.setErrorMessage(this.data.message);
		}
	}
}