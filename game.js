import * as be from "./src/beyonddd.js";

class Scheduler {
	constructor() {
		this.coroutines = new Set();
		this.before_start = () => {
			console.log("Tween Start");
		};
		this.finish = () => {
			console.log("Tween Finish");
		};
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

const SCENE_WIDTH = 800;
const SCENE_HEIGHT = 600;

// TODO:
// - camera movement
// - running field trap
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
const BASE_DISTANCE = 10.0

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
	scheduler.finish = () => {
		console.log("[INFO] CHANGE ENTITY TO PLAY")
		if (entityToPlay.get_name() === "Player") {
			entityToPlay = be.entity_get("Enemy");
		} else if (entityToPlay.get_name() === "Enemy") {
			entityToPlay = be.entity_get("Player");
		}
		canMove = true;
	}


	for (let i = 0; i < CARD_AMOUNT; i += 1) {
		const card = be.entity_create(`card${i}`);
		card.set_active(false);

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


// logic for inputs or what will happen if an input happenning
menuScene.input = () => {
	if (be.is_key_pressed("X")) {
		be.camera_movement(new be.Vector2(10, 0));
	}
	// if (be.is_key_pressed("X")) {
	// 	if (canMove === true) {
	// 		canMove = false
	// 		console.log("[INFO] Move Pause")
	// 	} else {
	// 		canMove = true
	// 		console.log("[INFO] Move Resume")
	// 	}
	// }
	// console.log("pressed  : ",be.is_key_pressed("X"));
	// console.log("down     : ", be.is_key_down("XX"));
	// console.log("released : ", be.is_key_released("XXX"));
};


// used for game logic such as movement, physics, enemies, etc. 
menuScene.update = (dt) => {
	// console.log(dt);

	if (canMove === true) {
		check_button_pressed();
	}
	scheduler.tick(dt);
};


function check_button_pressed() {
	for (let i = 0; i < CARD_AMOUNT; i += 1) {
		const card = be.entity_get(`card${i}`)
		if (card.is_active() === true) {
			card.set_active(false);
			canMove = false;

			console.log(card.get_id());
			use_card(card.get_id());
			break;
		}
	}
	
}

function use_card(cardId) {
	const cardTransform = be.component_get(entityToPlay.get_id(), be.COMPONENT_TYPE.TRANSFORM);
	let goal = cardTransform.pos.clone();
	goal.x += BASE_DISTANCE * (cardId + 1);
	scheduler.start( () => ( move(cardTransform, goal, 1) ) );
}


function* move(entityTransform, to, duration) {
  let t = 0;
  while (t < duration) {
    t += yield; // yield dt
    const p = Math.min(t / duration, 1);
    entityTransform.pos.x = be.lerp(entityTransform.pos.x, to.x, t);
    entityTransform.pos.y = be.lerp(entityTransform.pos.y, to.y, t);
  }
}

function mouse_detect_in_bounding_boxes(event) {
	const currSceneBB = be.scene_get_current().cBoundingBoxes;
	for (let bbS of currSceneBB) {
		if (bbS.is_active() && bbS.collisionType === be.COLLISION_TYPE.STATIC) {
			const entBBS = be.entity_get_by_id(bbS.userId);
			const cT = be.scene_get_current().cTransforms[entBBS.transformIdx];
			const cBB = be.scene_get_current().cBoundingBoxes[entBBS.boundingBoxIdx];

			const leftPos = cT.pos.x;
			const rightPos = cT.pos.x + cBB.size.x;
			const topPos = cT.pos.y;
			const botPos = cT.pos.y + cBB.size.y;

			const rect = be.canvas_get().getBoundingClientRect();
			const mousePosX = event.clientX - rect.left;
			const mousePosY = event.clientY - rect.top;

			const isMouseInside = (
				mousePosX >= leftPos &&
				mousePosX <= rightPos &&
				mousePosY >= topPos &&
				mousePosY <= botPos
			);
			if (event.type == "click" && isMouseInside) {
				entBBS.set_active(true);
			}
			else {
				if (entBBS.is_active() === true)
				{
					entBBS.set_active(false);
				}
			}

		}
	}
}



document.addEventListener("click", (event) => {
	if (canMove === true) {
		mouse_detect_in_bounding_boxes(event);
	}
})



window.onload = be.init; // entry point or game running
