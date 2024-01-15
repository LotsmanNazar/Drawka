class DrawUpdater {
	constructor(DrawController, DrawModel) {
		this.DrawController = DrawController;
		this.DrawModel = DrawModel;
		this.requestAnimationFrameID;
		this.speed = 4;
	}

	start() {
		this.requestAnimationFrameID = requestAnimationFrame(() => this.update());
	}

	stop() {
		cancelAnimationFrame(this.requestAnimationFrameID);
	}

	setSpeed(value) {
		if ( this.DrawModel.getDrawState().length ) {
			return false;
		}
		
		this.speed = value;
	}

	update() {
		var drawState = this.DrawModel.getDrawState();
		var ratio = this.DrawModel.getWidth() / this.DrawModel.getWrapper().offsetWidth;

		if ( drawState.length ) {
			var speed = ( this.speed ) ? this.speed : drawState.length;

			for ( var i = 0; i < speed; i++ ) {
				if ( drawState[i] == undefined ) {
					break;
				}

				var x = drawState[i][0] / ratio;
				var y = drawState[i][1] / ratio;

				this.DrawModel.setColor('#' + drawState[i][2]);
				this.DrawModel.setBrushSize(drawState[i][3] / ratio);

				if ( drawState[i][4] ) {
					this.DrawController.startDraw(x, y);
				}

				this.DrawController.draw(x, y);
			}

			drawState.splice(0, speed);
		}

		this.start();
	}
}