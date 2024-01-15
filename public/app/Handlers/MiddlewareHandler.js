class MiddlewareHandler {
	constructor(ServicesLocator) {
		this.ServicesLocator = ServicesLocator;
	}

	load() {
		var RouteObject = this.ServicesLocator.get('Route');
		var CookiesManagerObject = this.ServicesLocator.get('CookiesManager');
		var RequestControllerObject = this.ServicesLocator.get('SocketController').getRequestController();
		var PlayerObject = this.ServicesLocator.get('PlayersManager').getCurrentPlayer();
		var nickname = CookiesManagerObject.get('nickname');

		if ( nickname && ( nickname.length >= 3 || nickname.length <= 12 ) ) {
			PlayerObject.setNickname(nickname);
			RequestControllerObject.connect();
		} else {
			RouteObject.clearLocationParameters();
			RouteObject.redirect('pageEnter');
		}
	}
}