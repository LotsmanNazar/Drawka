class RoomsManager {
	constructor() {
		this.rooms = {};
		this.CurrentRoom = new Room();
	}

	add(Room) {
		this.rooms[Room.getID()] = Room;
	}

	get(id) {
		return this.rooms[id];
	}

	getAll() {
		return this.rooms;
	}

	remove(name) {
		delete this.rooms[id];
	}

	clear() {
		this.rooms = {};
	}

	getCurrentRoom() {
		return this.CurrentRoom;
	}

	clearCurrentRoom() {
		this.CurrentRoom.clear();
	}
}