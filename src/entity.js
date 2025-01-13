const entity_map = new Map();
let entity_created_count = 0;

/* 
	Note :
	the problem with Class approach (putting all the 
	components inside every entity) is
	when iterating through entity_map to access
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

function entity_create(name) {
	console.assert(entity_map.size < ENTITIES_AMOUNT, "Out of max amount of entity.") // called if false
	let new_entity = new Entity(name);
	new_entity.id = entity_created_count;
	entity_created_count += 1;
	entity_map.set(name, new_entity);
	return new_entity;
}

function entity_remove(name) {
	entity_map.delete(name);
	entity_created_count -= 1;
}


