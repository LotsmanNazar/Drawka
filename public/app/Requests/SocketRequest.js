class SocketRequest {
	constructor(socket, data) {
		this.socket = socket;
		this.data = data;
	}

	run() {

	}

	emit(name, data) {
		this.socket.emit(name, data);
	}
}