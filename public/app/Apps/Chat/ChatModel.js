class ChatModel {
	constructor() {
		this.messages = {
			roomCreated1: {
				text: 'You have created room.'
			},

			roomCreated2: {
				text: 'Send the url (<b>%link%</b>) to your friends so they can join the game.'
			},

			roomCreated3: {
				text: 'Wait for players to connect.'
			},

			enterInRoom1: {
				text: 'You entered the room.'
			},

			enterInRoom2: {
				text: 'Send the url (<b>%link%</b>) to your friends so they can join the game.'
			},

			gameStarted: {
				text: 'The game has begun.'
			},

			startSelectWord: {
				text: '%nickname% has become an drawer and selects a word.'
			},

			endSelectWord: {
				text: '%nickname% chose the word.'
			},

			roundStarted: {
				text: 'Round %round% has begun.'
			},

			roundEnded: {
				text: 'Round ended.'
			},

			roundEnded2: {
				text: 'The word in this round was "%word%".'
			},

			gameEnded: {
				text: 'Scoring...'
			},

			playerEnterInRoom: {
				text: '%nickname% entered the room.'
			},

			playerLeaveRoom: {
				text: '%nickname% left the room.'
			},

			wordError: {
				text: 'Word must be %length% letters.',
				color: '#fbb91d'
			},

			chatMessage1: {
				text: '%nickname% suggests that the word is "%word%".',
				color: '#5eb0ff'
			},

			chatMessage2: {
				text: '%nickname% guessed the word.',
				color: '#7fd237'
			},

			chatMessage3: {
				text: '%nickname% didn\'t guess.',
				color: '#5eb0ff'
			},

			hint: {
				text: 'Hint: %word%',
				color: '#eb6fe9'
			}
		}
	}

	getMessage(id, replace) {
		var message = this.messages[id].text;

		var date = new Date();
		var hours = date.getHours();
		hours = ( hours < 10 ) ? '0' + hours : hours;

		var minutes = date.getMinutes();
		minutes = ( minutes < 10 ) ? '0' + minutes : minutes;

		var seconds = date.getSeconds();
		seconds = ( seconds < 10 ) ? '0' + seconds : seconds;

		var messageObject = {
			timestamp: hours + ':' + minutes + ':' + seconds,
			message: message,
			color: this.messages[id].color
		};

		return messageObject;
	}
}