var vue = new Vue({
	el: '.game-app-wrapper',
	data: {
		drawColors: ['#5f5f5f', '#ffffff', '#ff7878', '#fbb91d', '#ffde35', '#7fd237', '#4ce2e0', '#5eb0ff'],
		drawBrushes: [{size: 'small', sizeValue: 3}, {size: 'medium', sizeValue: 10}, {size: 'large', sizeValue: 100}],
		drawColor: '#5f5f5f',
		drawBrushSize: 3,
		drawActive: false,
		currentPage: 'pageLoading',
		disconectStatus: false,
		drawTouchStartTimestamp: 0,
		drawTouch: false,
		touchEnd: false,
		errorMessage: '',
		player: {},
		room: {},
		rooms: {}
	},

	beforeCreate: function() {
		this.App = new App(this);
	},

	created() {
		this.player = {...this.App.getServicesLocator().get('PlayersManager').getCurrentPlayer()};
	},

	mounted: function() {
		this.App.init(this);
	},

	methods: {
		updateRooms(rooms) {
			this.rooms = rooms;
			for ( id in rooms ) {
				this.rooms[id] = {...rooms[id]};
			}
		},

		updateRoom(room) {
			this.rooms[room.ID] = room;
		},

		updateCurrentRoom(room) {
			this.room = room;
		},

		updatePlayer(player) {
			this.player = player;
		},

		getApp() {
			return this.App;
		},

		getTranslate(string, replace) {
			return this.App.getServicesLocator().get('Localization').getTranslation(string, replace);
		},

		setErrorMessage(message) {
			this.errorMessage = message;
		},

		getErrorMessage() {
			return this.errorMessage;
		},

		setDisconectStatus(status) {
			this.disconectStatus = status;
		},

		getDisconectStatus() {
			return this.disconectStatus;
		},

		setCurrentPage(name) {
			this.currentPage = name;
		},

		getCurrentPage() {
			return this.currentPage;
		},

		startDraw: function(e) {
			if ( this.room.drawer != this.player.ID ) {
				return false;
			}

			var offset = this.$refs.drawWrapper.getBoundingClientRect();
			var x = e.pageX - offset.left;
			var y = e.pageY - offset.top;

			this.drawActive = true;
			this.App.getServicesLocator().get('DrawController').startDraw(x, y);
			this.updateDrawData(x, y, 1);
		},

		draw: function(e) {
			if ( !this.drawActive || this.touchEnd || this.room.drawer != this.player.ID ) {
				return false;
			}

			var offset = this.$refs.drawWrapper.getBoundingClientRect();
			var x = e.pageX - offset.left;
			var y = e.pageY - offset.top;

			this.App.getServicesLocator().get('DrawController').draw(x, y);
			this.updateDrawData(x, y);
		},

		endDraw(e) {
			this.drawActive = false;
		},

		drawTouchStart(e) {
			var timestamp = window.performance.now();

    	if ( timestamp - this.drawTouchStartTimestamp > 200 ) {
    		this.drawTouchStartTimestamp = timestamp;

    		return false;
    	}

    	e.preventDefault();

    	this.drawTouch = true;
    	this.touchEnd = false;
    	this.startDraw(e.touches[0]);
		},

		drawTouchMove(e) {
    	if ( !this.drawTouch ) {
    		return false;
    	}

			e.preventDefault();
    	this.draw(e.touches[0]);
		},

		drawTouchEnd(e) {
			this.drawTouch = false;
			this.touchEnd = true;
		},

		updateDrawData(x, y, start = 0) {
			var data = [x, y, this.drawColor.substring(1), this.drawBrushSize, start];
			this.App.getServicesLocator().get('DrawController').getModel().addToNewDrawState(data);
		},

		changeColor: function(e) {
			this.drawColor = e.target.dataset.color;
			this.App.getServicesLocator().get('DrawController').changeColor(this.drawColor);
		},

		changeBrush: function(e) {
			this.drawBrushSize = e.target.dataset.size;
			this.App.getServicesLocator().get('DrawController').changeBrushSize(this.drawBrushSize);
		},

		socketConnect: function(e) {
			e.preventDefault();

			var nickname = this.$refs.nickname.value.replaceAll('<', '').replaceAll('>', '');;

			if ( nickname.length < 3 || nickname.length > 12 ) {
				this.errorMessage = 'Nickname can contain from 3 to 12 characters.';
				this.App.getServicesLocator().get('Route').redirect('pageError');

				return false;
			}

			this.player.nickname = nickname;

			this.App.getServicesLocator().get('CookiesManager').add('nickname', this.player.nickname);
			this.App.getServicesLocator().get('PlayersManager').getCurrentPlayer().setNickname(this.player.nickname);
			this.App.getServicesLocator().get('SocketController').getRequestController().connect();
		},

		createRoom() {
			var SettingsHandlerObject = new SettingsHandler(this.$refs.pageCreateRoom);
			var values = SettingsHandlerObject.getValues();

			this.App.getServicesLocator().get('SocketController').getRequestController().createRoom(values);
		},

		enterRoom(e) {
			var requestData = {
				roomID: e.target.getAttribute('data-id')
			};

			var room = this.rooms[requestData.roomID];

			if ( room.status == 'ended' || room.playersCount == room.maxPlayers ) {
				return false;
			}

			this.App.getServicesLocator().get('SocketController').getRequestController().enterInRoom(requestData);
		},

		leaveRoom(e) {
			window.location.href = window.location.origin;
		},

		startGame(e) {
			this.App.getServicesLocator().get('SocketController').getRequestController().startGame({
				roomID: this.room.ID
			});
		},

		selectWord(e) {
			var word = e.target.dataset.word;

			this.App.getServicesLocator().get('SocketController').getRequestController().selectWord({
				roomID: this.room.ID,
				word: word
			});
		},

		showWrapper(wrapper, animation = true) {
			wrapper.style.display = 'block';

			if ( animation ) {
				wrapper.style.opacity = 0;
				wrapper.style.transition = 0.5 + 's';

				setTimeout( () => {
					wrapper.style.opacity = 1;
				}, 100);
			}
		},

		hideWrapper(wrapper, animation = false) {
			if ( animation ) {
				wrapper.style.opacity = 0;
				wrapper.style.transition = 0.5 + 's';

				setTimeout( () => {
					wrapper.style.display = 'none';
				}, 500);
			} else {
				wrapper.style.display = 'none';
			}
		},

		setHTML(wrapper, html) {
			wrapper.innerHTML = html;
		},

		pageReload(clearURLParameters = false) {
			if ( clearURLParameters ) {
				this.App.getServicesLocator().get('Route').clearLocationParameters();
			}

			window.location.reload();
		},

		changeNickname() {
			this.App.getServicesLocator().get('CookiesManager').remove('nickname');
			this.pageReload();
		},

		saveSettings() {
			var SettingsHandlerObject = new SettingsHandler(this.$refs.pageSettings);
			var values = SettingsHandlerObject.getValues();

			for ( name in values ) {
				this.App.getServicesLocator().get('CookiesManager').add(name, values[name]);
			}

			this.pageReload();
		},

		checkLang(langValue) {
			var settingLang = this.App.getServicesLocator().get('CookiesManager').get('lang');
			settingLang = ( settingLang ) ? settingLang : 'en';

			return settingLang == langValue;
		},

		getLang(langValue) {
			var langs = {
				ru: 'русский',
				en: 'english'
			}

			return langs[langValue];
		}
	}
});