class RemoveRoomResponse extends SocketResponse {
	constructor(ServicesLocator, data) {
		super(ServicesLocator, data);
	}

	run() {
		var VueObject = this.ServicesLocator.get('Vue');
		var RoomsManagerObject = this.ServicesLocator.get('RoomsManager');
		var RoomObject = RoomsManagerObject.get(this.data.roomID);

		RoomObject.setData(this.data.room);

		VueObject.updateRoom({...RoomObject});
	}
}