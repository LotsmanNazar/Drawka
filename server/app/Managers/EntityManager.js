class EntityManager {
	constructor(Entity) {
		this.Entity = Entity;
	}

	getEntity() {
		return this.Entity;
	}
}

module.exports = EntityManager;