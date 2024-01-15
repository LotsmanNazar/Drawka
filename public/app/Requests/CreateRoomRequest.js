class CreateRoomRequest extends SocketRequest {
	constructor(socket, data) {
		super(socket, data);
	}

	run() {
		this.emit('createRoom', this.data);
	}
}