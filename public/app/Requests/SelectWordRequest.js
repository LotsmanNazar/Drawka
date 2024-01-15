class SelectWordRequest extends SocketRequest {
	constructor(socket, data) {
		super(socket, data);
	}

	run() {
		this.emit('selectWord', this.data);
	}
}