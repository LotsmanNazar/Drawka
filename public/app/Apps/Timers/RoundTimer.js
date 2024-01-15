class RoundTimer extends Timer {
	constructor(time) {
		super(time);

		this.start();
	}

	getTime() {
		var time = ( this.time > 0 ) ? this.time : '...';
		return time;
	}
}