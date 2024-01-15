class EnterInRoomRequest extends SocketRequest {
	constructor(socket, data) {
		super(socket, data);
	}

	run() {
		this.emit('enterInRoom', this.data);
	}
}