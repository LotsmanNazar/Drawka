class LeaveRoomRequest extends SocketRequest {
	constructor(socket, data) {
		super(socket, data);
	}

	run() {
		this.emit('leaveRoom', this.data);
	}
}