class TaskManager {
	constructor(ServicesLocator) {
		this.ServicesLocator = ServicesLocator;
		this.tasks = {};
		this.timerID;

		this.init();
	}

	init() {
		this.timerID = setInterval( () => {
			this.checkTasks(this.ServicesLocator.get('Helper').getTimestamp());
		}, 1000);
	}

	add(Task) {
		var ID = this.ServicesLocator.get('Helper').generateTaskID();
		var timestamp = Task.getTimestamp();
		Task.setID(ID);

		if ( this.tasks[timestamp] !== undefined ) {
			this.tasks[timestamp][Task.getID()] = Task;
		} else {
			this.tasks[timestamp] = {};
			this.tasks[timestamp][Task.getID()] = Task;
		}
	}

	remove(Task) {
		if (
			Task === undefined ||
			this.tasks[Task.getTimestamp()] === undefined ||
			this.tasks[Task.getTimestamp()][Task.getID()] === undefined
		) {
			return false;
		}

		delete this.tasks[Task.getTimestamp()][Task.getID()];

		if ( !Object.keys(this.tasks[Task.getTimestamp()]).length ) {
			delete this.tasks[Task.getTimestamp()];
		}
	}

	checkTasks(timestamp) {
		for ( var tasksTimestamp in this.tasks ) {
			if ( tasksTimestamp <= timestamp ) {
				for ( var taskID in this.tasks[tasksTimestamp] ) {
					var TaskObject = this.tasks[tasksTimestamp][taskID];
					TaskObject.run();

					this.remove(TaskObject);
				}
			}
		}
	}
}

module.exports = TaskManager;