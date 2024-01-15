class StartGameRequest extends SocketRequest {
	constructor(socket, data) {
		super(socket, data);
	}

	run() {
		this.emit('startGame', this.data);
	}
}