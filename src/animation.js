let anim_walk = load_image("assets/Spritesheet/walk.png");

function animation_setup() {
	let animSprite = new Sprite(anim_walk, cTransforms[0].pos);
	cSprites[0] = animSprite;
	let playerAnim = new Animation("walk", cSprites[0], 6, 0, 5);
	cAnimations[0] = playerAnim;
}

function animation_update(anim) {
	anim.currentFrame++;
	let animFrame = Math.floor((anim.currentFrame / anim.speed) % anim.frameCount);
	let spriteXSSize = anim.sprite.ssize.x;
	anim.sprite.spos.x = animFrame * spriteXSSize;	
	draw_image(anim.sprite);
}