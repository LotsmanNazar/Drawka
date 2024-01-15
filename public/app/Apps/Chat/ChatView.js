class ChatView {
	constructor(wrapper) {
		this.wrapper = wrapper;
	}

	addMessage(messageObject) {
		var color = ( messageObject.color !== undefined ) ? ' style="color: ' + messageObject.color + ';"' : '';
		var message = '<div class="game-chat-message-wrapper">' +
			'<span class="game-chat-message-author"><span>' + messageObject.timestamp + '</span> </span>' +
			'<p class="game-chat-message"' + color + '>' + messageObject.message + '</p>' +
		'</div>';

		this.wrapper.innerHTML = message + this.wrapper.innerHTML;

		setTimeout( () => {
			this.wrapper.scroll({top: 0, behavior: 'smooth'});
		}, 100);
	}

	clearChat() {
		this.wrapper.innerHTML = '';
	}
}