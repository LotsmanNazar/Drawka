class DrawStateRequest extends SocketRequest {
	constructor(socket, data) {
		super(socket, data);
	}

	run() {
		this.emit('drawState', this.data);
	}
}