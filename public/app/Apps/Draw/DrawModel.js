class DrawModel {
	constructor(canvas, wrapper) {
		this.canvas = canvas;
		this.wrapper = wrapper
		this.width;
		this.height;
		this.scale = 1.5;
		this.brushSize = 3;
		this.ctx = this.canvas.getContext('2d');

		this.prevDrawX = 0;
		this.prevDrawY = 0;
		this.drawColor = '#5f5f5f';

		this.drawState = [];
		this.newDrawState = [];

		this.init();
	}

	init() {
		this.drawColor = '#5f5f5f';
		this.brushSize = 3;
		this.width = 900;
		this.height = 400;
	}

	addToDrawState(state) {
		this.drawState = this.drawState.concat(state);
	}

	clearDrawState() {
		this.drawState = [];
	}

	getDrawState() {
		return this.drawState;
	}

	addToNewDrawState(state) {
		this.newDrawState.push(state);
	}

	getNewDrawState() {
		return this.newDrawState;
	}

	clearNewDrawState() {
		this.newDrawState = [];
	}

	setWidth(width) {
		this.width = width;
	}

	getWidth() {
		return this.width;
	}

	setColor(color) {
		this.drawColor = color;
	}

	getColor() {
		return this.drawColor;
	}

	setBrushSize(size) {
		this.brushSize = size;
	}

	getBrushSize() {
		return this.brushSize;
	}

	setHeight(height) {
		this.height = height;
	}

	getHeight() {
		return this.height;
	}

	getWrapper() {
		return this.wrapper;
	}
}