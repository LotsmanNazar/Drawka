var ObjectsManager = require('./ObjectsManager');

class RoomsManager extends ObjectsManager {
	constructor() {
		super();
	}

	getDataForList(ServicesLocator) {
		var data = {};
		var ids = Object.keys(this.objects);

		for ( var i = 0; i < ids.length; i++ ) {
			var RoomObject = this.objects[ids[i]];

			if ( RoomObject.isPrivate() ) {
				continue;
			}

			var RoomManagerObject = ServicesLocator.get('ObjectsCreator').roomManager(RoomObject);
			data[ids[i]] = RoomManagerObject.getDataRoomsList();
		}

		return data;
	}
}

module.exports = RoomsManager;