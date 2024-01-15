class UpdateMainRoomResponse extends SocketResponse {
	constructor(ServicesLocator, data) {
		super(ServicesLocator, data);
	}

	run() {
		var VueObject = this.ServicesLocator.get('Vue');
		var RoomsManagerObject = this.ServicesLocator.get('RoomsManager');

		for ( var id in this.data.rooms ) {
			var  RoomObject= new Room();
			RoomObject.setData(this.data.rooms[id]);
			RoomsManagerObject.add(RoomObject);
		}

		VueObject.updateRooms({...RoomsManagerObject.getAll()});
	}
}