class DrawView {
	constructor(ctx) {
		this.ctx = ctx;
	}

	setScale(scale) {
		this.ctx.scale(scale, scale);
	}

	setSize(canvas, w, h, scale) {
		canvas.width = w * scale;
		canvas.height = h * scale;
	}

	setStranslate(x, y) {
		this.ctx.translate(x, y);
	}

	drawLine(x1, y1, x2, y2, w, color) {
		for ( var i = 0; i < 3; i++ ) {
			this.ctx.beginPath();
			this.ctx.moveTo(x1, y1);
			this.ctx.lineTo(x2, y2);
			this.ctx.lineWidth = w;
			this.ctx.strokeStyle = color;
			this.ctx.stroke();
			this.ctx.closePath();
		}
	}

	drawCircle(x, y, w, color) {
		this.ctx.beginPath();
		this.ctx.fillStyle = color;
		this.ctx.arc(x, y, w, 0, Math.PI * 2);
		this.ctx.fill();
		this.ctx.closePath();
	}

	moveTo(x, y) {
		this.ctx.moveTo(x, y);
	}

	clear(w, h) {
		this.ctx.clearRect(0, 0, w, h);
	}
}