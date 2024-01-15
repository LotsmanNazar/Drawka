class UserEnterRequest extends SocketRequest {
	constructor(socket, data) {
		super(socket, data);
	}

	run() {
		this.emit('userEnter', this.data);
	}
}