class ChatMessageRequest extends SocketRequest {
	constructor(socket, data) {
		super(socket, data);
	}

	run() {
		this.emit('chatMessage', this.data);
	}
}