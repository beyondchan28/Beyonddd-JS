import * as be from "./src/beyonddd.js";

const SCENE_WIDTH = 800;
const SCENE_HEIGHT = 600;

// TODO:
// - camera movement
// - running field trap
// - click card to move
// - implement assets
// - main menu (optional) and exit

be.canvas_setup("canvas", SCENE_WIDTH, SCENE_HEIGHT); // assigning canvas, context, and its size 
const menuScene = be.scene_create("Menu"); // creating scene (with GUI-only type of components)
be.scene_change("Menu"); // change to the scene as the current scene.

// running before the game start. used for setup entities, components, inputs etc. 
const CARD_AMOUNT = 3
const CARD_SIZE = 64
const CARD_GAP = 10;
const CARD_X_OFFSET = (SCENE_WIDTH / 2) - ((CARD_SIZE) * CARD_AMOUNT) / 2
const CARD_Y_OFFSET = SCENE_HEIGHT - CARD_SIZE - 30

const MOVE_TIME = 0.1
const BASE_DISTANCE = 200.0

let goal = new be.Vector2(BASE_DISTANCE, 0);
let multiplier = 0;
let canMove = true

let entityToPlay
let scheduler;

menuScene.setup = () => {
	be.input_press_create("X", be.KEY.SPACE);

	be.asset_load_image("player_anim_walk", "assets/player_walk.png");
	be.asset_load_image("enemy_anim_walk", "assets/enemy_walk.png");
	be.asset_load_image("icon", "assets/icon.png");
	
	setup_playable_entity("Player", "player_anim_walk", "PlayerWalk", 100);
	setup_playable_entity("Enemy", "enemy_anim_walk", "EnemyWalk", 200);

	entityToPlay = be.entity_get("Player");

	scheduler = new Scheduler();
	const entityTransform = be.component_get(entityToPlay.get_id(), be.COMPONENT_TYPE.TRANSFORM);
	scheduler.start( () => ( move(entityTransform, goal, 2) ) );	

	scheduler.finish = () => {
		console.log("[INFO] CHANGE ENTITY TO PLAY")
		if (entityToPlay.get_name() === "Player") {
			entityToPlay = be.entity_get("Enemy");
		} else if (entityToPlay.get_name() === "Enemy") {
			entityToPlay = be.entity_get("Player");
		}
		const entityTransform = be.component_get(entityToPlay.get_id(), be.COMPONENT_TYPE.TRANSFORM);
		goal.y = entityTransform.pos.y;
		multiplier += 1;
		goal.x = BASE_DISTANCE * multiplier;
		scheduler.start( () => ( move(entityTransform, goal, 2) ) );
	}


	for (let i = 0; i < CARD_AMOUNT; i += 1) {
		const card = be.entity_create(`card${i}`)

		be.component_add(card, be.COMPONENT_TYPE.TRANSFORM);
		const cardT = be.component_get(
			card.get_id(), be.COMPONENT_TYPE.TRANSFORM
		);

		
		cardT.pos.x = CARD_SIZE * i + CARD_X_OFFSET + (CARD_GAP * i);
		cardT.pos.y = CARD_Y_OFFSET;

		be.component_add(card, be.COMPONENT_TYPE.SPRITE);
		// be.sprite_set(card.spriteIdx, "icon");

		be.component_add(card, be.COMPONENT_TYPE.BOUNDING_BOX);
		be.bounding_box_set(
			card.boundingBoxIdx, 
			new be.Vector2(CARD_SIZE, CARD_SIZE), 
			be.COLLISION_TYPE.STATIC
		);
	}

}

// logic for inputs or what will happen if an input happenning
menuScene.input = () => {
	if (be.is_key_pressed("X")) {
		if (canMove === true) {
			canMove = false
			console.log("[INFO] Move Pause")
		} else {
			canMove = true
			console.log("[INFO] Move Resume")
		}
	}
	// console.log("pressed  : ",be.is_key_pressed("X"));
	// console.log("down     : ", be.is_key_down("XX"));
	// console.log("released : ", be.is_key_released("XXX"));
};

class Scheduler {
  constructor() {
    this.coroutines = new Set();
    this.before_start = () => {
  		// console.log("Tween Start");
    }
    this.finish = () => {
  		console.log("Tween Finish");
  	}
  }

  start(generator) {
  	this.before_start();
  	const co = generator();
    this.coroutines.add(co);
    return co;
  }

  tick(dt) {
    for (const co of [...this.coroutines]) {
      const { done } = co.next(dt);
      if (done) {
        this.coroutines.delete(co);
        this.finish();
      }
    }
  }

  
}

// used for game logic such as movement, physics, enemies, etc. 
menuScene.update = (dt) => {
	// console.log(dt);
	scheduler.tick(dt);

	if (canMove === true) {
		const entityTransform = be.component_get(entityToPlay.get_id(), be.COMPONENT_TYPE.TRANSFORM);
		// console.log(goal);

		


		// multiplier += 1;
		// goal = BASE_DISTANCE * multiplier;

		// move_entity(entityTransform, goal);
		// if ( is_reach_goal_position(entityTransform.pos.x, goal) === true ) {
		// 	console.log("[INFO] CHANGE ENTITY TO PLAY")
		// 	if (entityToPlay.get_name() === "Player") {
		// 		entityToPlay = be.entity_get("Enemy");
		// 	} else if (entityToPlay.get_name() === "Enemy") {
		// 		entityToPlay = be.entity_get("Player");
		// 	}
		// 	multiplier += 1;
		// 	goal = BASE_DISTANCE * multiplier;
		// }
	}
};



function* move(entityTransform, to, duration) {
  let t = 0;
  while (t < duration) {
    t += yield; // yield dt
    const p = Math.min(t / duration, 1);
    entityTransform.pos.x = entityTransform.pos.x + (to.x - entityTransform.pos.x) * p;
    entityTransform.pos.y = entityTransform.pos.y + (to.y - entityTransform.pos.y) * p;
  }
}


function setup_playable_entity(entityName, spriteName, animName, yPos) {
	const entity = be.entity_create(entityName);
	be.component_add(entity, be.COMPONENT_TYPE.TRANSFORM);
	const entityT = be.component_get(entity.get_id(), be.COMPONENT_TYPE.TRANSFORM);
	entityT.pos.x = 100;
	entityT.pos.y = yPos;

	be.component_add(entity, be.COMPONENT_TYPE.SPRITE);
	be.sprite_set(entity.spriteIdx, spriteName);

	be.component_add(entity, be.COMPONENT_TYPE.ANIMATION);
	be.animation_set_sprite(entity.animationIdx, entity.spriteIdx);
	be.animation_setup(entity.animationIdx, animName, 6, 10);

	be.component_add(entity, be.COMPONENT_TYPE.BOUNDING_BOX);
	be.bounding_box_set(
		entity.boundingBoxIdx, 
		new be.Vector2(210/6, 43), 
		be.COLLISION_TYPE.KINEMATIC
	);
}

function move_entity(entityTransform, goal) {
	entityTransform.pos.x = be.lerp(entityTransform.pos.x, goal, MOVE_TIME);
}

function is_reach_goal_position(entityXPos, goal) {
	// console.log(Math.ceil(entityTransform.pos.x))	
	return Math.ceil(entityXPos) >= goal;
}


window.onload = be.init; // entry point or game running
