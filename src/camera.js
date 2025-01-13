let camera = {
    transform: new Transform(),
}

//TODO: not really understand on how this works
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

function camera_process(ts) {
    camera.transform.pos.x -= 0.0001 * ts;
    camera.transform.pos.y -= 0.0001 * ts;
    camera.transform.pos.normalize();
    camera_moveTo(camera.transform.pos);
}