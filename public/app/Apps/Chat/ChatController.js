class ChatController {
	constructor(form, wrapper, Localization) {
		this.form = form;

		this.Localization = Localization;
		this.Model = new ChatModel();
		this.View = new ChatView(wrapper);

		this.init();
	}

	onSubmit(form) {

	}

	init() {
		this.form.addEventListener('submit', (e) => {
			e.preventDefault();

			this.onSubmit(this.form);
		});
	}

	newMessage(id, replace) {
		var message = this.Model.getMessage(id, replace);
		message.message = this.Localization.getTranslation(message.message, replace);
		this.View.addMessage(message);
	}

	clearChat() {
		this.View.clearChat();
	}
}