const sceneMap = new Map();

class Scene {
	component_default_setup() {
		for (let i = 0; i < this.ENTITIES_AMOUNT; i += 1) {
			this.cTransforms[i] = new Transform();
			this.cBoundingBoxes[i] = new BoundingBox();
			this.cSprites[i] = new Sprite();
			this.cAnimations[i] = new Animation();
		}
	}

	constructor(entAmount) {
		this.ENTITIES_AMOUNT = (entAmount === undefined) ? 10 : entAmount;
		this.entityCreatedCount = 0;

		this.entityMap = new Map();
		this.assetImageMap = new Map();
		this.inputMap = new Map();
		
		this.cTransforms = new Array(this.ENTITIES_AMOUNT);
		this.cBoundingBoxes = new Array(this.ENTITIES_AMOUNT);
		this.cSprites = new Array(this.ENTITIES_AMOUNT);
		this.cAnimations = new Array(this.ENTITIES_AMOUNT);
		
		this.component_default_setup();
	}
}

function scene_create(name, entAmount) {
	const newScene = new Scene(entAmount);
	sceneMap.set(name, newScene);
	return newScene;
}