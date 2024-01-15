class DrawStateResponse extends SocketResponse {
	constructor(ServicesLocator, data) {
		super(ServicesLocator, data);
	}

	run() {
		var DrawControllerObject = this.ServicesLocator.get('DrawController');
		DrawControllerObject.getDrawUpdater().setSpeed(2);
		DrawControllerObject.getModel().addToDrawState(this.data.drawState);
	}
}