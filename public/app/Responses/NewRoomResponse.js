class NewRoomResponse extends SocketResponse {
	constructor(ServicesLocator, data) {
		super(ServicesLocator, data);
	}

	run() {
		var VueObject = this.ServicesLocator.get('Vue');
		var RoomsManagerObject = this.ServicesLocator.get('RoomsManager');
		var RoomObject = new Room();

		RoomObject.setData(this.data.room);
		RoomsManagerObject.add(RoomObject);

		VueObject.updateRooms({...RoomsManagerObject.getAll()});
	}
}