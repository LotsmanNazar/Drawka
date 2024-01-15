class DrawController {
	constructor(canvas, wrapper) {
		this.DrawModel = new DrawModel(canvas, wrapper);
		this.DrawView = new DrawView(this.DrawModel.ctx);
		this.DrawUpdater = new DrawUpdater(this, this.DrawModel);
	}

	clear() {
		this.DrawView.clear(this.DrawModel.width, this.DrawModel.height);
	}

	init() {
		this.DrawModel.init();
		this.DrawView.setSize(this.DrawModel.canvas, this.DrawModel.width, this.DrawModel.height, this.DrawModel.scale);
		this.DrawView.setScale(this.DrawModel.scale);
		this.clear();
	}

	startDraw(x, y) {
		this.DrawModel.prevDrawX = x;
		this.DrawModel.prevDrawY = y;
		this.DrawView.drawCircle(x, y, this.DrawModel.brushSize / 2, this.DrawModel.drawColor);
	}

	draw(x, y) {
		this.DrawView.drawCircle(x, y, this.DrawModel.brushSize / 2, this.DrawModel.drawColor);
		this.DrawView.drawLine(this.DrawModel.prevDrawX, this.DrawModel.prevDrawY, x, y, this.DrawModel.brushSize, this.DrawModel.drawColor);

		this.DrawModel.prevDrawX = x;
		this.DrawModel.prevDrawY = y;
	}

	moveTo(x, y) {
		this.DrawView.moveTo(x, y);
	}

	changeColor(color) {
		this.DrawModel.drawColor = color;
	}

	changeBrushSize(size) {
		this.DrawModel.brushSize = size;
	}

	clear() {
		this.DrawView.clear(this.DrawModel.width, this.DrawModel.height);
	}

	getModel() {
		return this.DrawModel;
	}

	getDrawUpdater() {
		return this.DrawUpdater;
	}

	startUpdate() {
		this.DrawUpdater.start();
	}

	stopUpdate() {
		this.DrawUpdater.stop();
	}
}