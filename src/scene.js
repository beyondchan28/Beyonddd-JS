class Scene {
	// component_default_setup() {
	// 	for (let i = 0; i < this.ENTITIES_AMOUNT; i += 1) {
	// 		this.cTransforms[i] = new Transform();
	// 		this.cBoundingBoxes[i] = new BoundingBox();
	// 		this.cSprites[i] = new Sprite();
	// 		this.cAnimations[i] = new Animation();
	// 	}
	// }

	constructor() {
		// this.ENTITIES_AMOUNT = (entAmount === undefined) ? 10 : entAmount;
		this.entityCreatedCount = 0;

		this.entityMap = new Map();
		
		this.cTransforms = new Array();
		this.cBoundingBoxes = new Array();
		this.cSprites = new Array();
		this.cAnimations = new Array();
		
		// this.component_default_setup();
		// add camera object ?
	}
}

function scene_create(name, scnMap) {
	const newScene = new Scene();
	scnMap.set(name, newScene);
	return newScene;
}