let camera = {
    transform: new Transform(),
}

function camera_moveTo(end) {
    // console.log(end);
    if (end.x === -canvas.width/2) {
        console.log("HAPPEN");
        end.x = 0;
    }

    if (end.y === -canvas.height/2) {
        end.y = 0;
    }

    ctx.translate(end.x, end.y);
}

function camera_process() {
    camera.transform.pos.x -= 0.01 * ts;
    camera.transform.pos.y -= 0.01 * ts;
    camera.transform.pos.normalize();
    camera_moveTo(camera.transform.pos);
}