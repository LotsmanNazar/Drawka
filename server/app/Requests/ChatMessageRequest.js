var RequestHandler = require('./RequestHandler');

class ChatMessageRequest extends RequestHandler {
	constructor(data, ServicesLocator) {
		super(data, ServicesLocator);
	}

	validate() {
		var word = this.data.word;

		if ( word === undefined ) {
			return false;
		}

		this.data.word = this.data.word.replaceAll('<', '').replaceAll('>', '').toLowerCase();

		return true;
	}

	handle() {
		if ( !this.validate() ) {
			return {
				error: true,
				emit: false
			}
		}

		var playerDefined = this.playerDefined(true);
		if ( playerDefined ) {
			return playerDefined;
		}

		var roomDefined = this.roomDefined(true);
		if ( roomDefined ) {
			return roomDefined;
		}

		if (
			this.Room.getStatus() != 'started' ||
			!this.Room.getRoundStarted() ||
			this.data.word.length != this.Room.getWord().length
		) {
			return {
				error: true,
				emit: false
			}
		}

		this.ServicesLocator.get('EventsManager').triggerEvent('chatMessage', {
			Room: this.Room,
			Player: this.Player,
			message: this.data.word
		});

		return {
			emit: false
		}
	}
}

module.exports = ChatMessageRequest;