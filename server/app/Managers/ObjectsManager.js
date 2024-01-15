class ObjectsManager {
	constructor() {
		this.objects = {};
	}

	add(ObjectItem) {
		this.objects[ObjectItem.getID()] = ObjectItem;
	}

	get(id) {
		return this.objects[id];
	}

	getAll(dataList = []) {
		return this.objects;
	}

	remove(ObjectItem) {
		delete this.objects[ObjectItem.getID()];
	}

	getCount() {
		return Object.keys(this.objects).length;
	}
}

module.exports = ObjectsManager;