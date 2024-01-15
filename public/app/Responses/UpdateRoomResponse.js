class UpdateRoomResponse extends SocketResponse {
	constructor(ServicesLocator, data) {
		super(ServicesLocator, data);
	}

	run() {
		var VueObject = this.ServicesLocator.get('Vue');
		var RoomObject = this.ServicesLocator.get('RoomsManager').getCurrentRoom();
		RoomObject.setData(this.data.room);
		VueObject.updateCurrentRoom({...RoomObject});
	}
}