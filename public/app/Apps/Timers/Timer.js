class Timer {
	constructor(time) {
		this.time = time;
		this.interval;
	}

	getNow() {
		return parseInt(Date.now() / 1000);
	}

	start() {
		var date = this.getNow() + this.time;
		this.interval = setInterval( () => {
			var different = date - this.getNow();
			this.time = different;
			if ( different <= 0 ) {
				this.stop();
			}
		}, 1000);
	}

	onStop() {

	}

	stop() {
		this.onStop();
		clearInterval(this.interval)
		this.interval = undefined;
		this.time = 0;
	}

	setTime(time) {
		this.stop();
		this.time = time;
		this.start();
	}

	getTime() {
		return this.time;
	}
}