class SocketConnectRequest extends SocketRequest {
	constructor(socket) {
		super(socket);
	}

	run() {
		this.socket.connect();
	}
}