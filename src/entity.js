/* 
	Note :
	the problem with Class approach (putting all the 
	components inside every entity) is
	when iterating through entityMap to access
	one specific component, it loads all the thing inside the
	entity, so it required a lot more time to call
	rather than grouped every component on its own
	data structure such as array. But its nicer to organized .
*/

class Entity {
	constructor(id, name, active) {
		this.id = (typeof id !== "number") ? 0 : id;
		this.name = (typeof name !== "string") ? "" : name;
		this.active = (typeof active !== "boolean") ? true : active;
		
		// keep track the used comp by its index. -1 means using none.
		this.transformIdx = -1;
		this.boundingBoxIdx = -1;
		this.spriteIdx = -1;
		this.animationIdx = -1;
	}
}

function entity_create(name, scene) {
	let newEntity = new Entity(name);
	newEntity.id = scene.enetityCreatedCount;
	scene.enetityCreatedCount += 1;
	scene.entityMap.set(name, newEntity);
	return newEntity;
}

function entity_remove(name, scene) {
	scene.entityMap.delete(name);
	entCount -= 1;
}


