function EventListener() {
    document.onkeydown = keyDown;
    document.onkeyup = keyUp;
}

let KEY_W = 87;
let KEY_A = 65;
let KEY_S = 83;
let KEY_D = 68;
let KEY_ENTER = 13;
let KEY_SPACE = 32;

function keyDown(event) {
    if (Outrun.scene == IN_GAME_SCENE) {
        if (event.which == KEY_W) {
            Driver.accelerate = true;
        } else if (event.which == KEY_S) {
            Driver.decelerate = true;
        } else if (event.which == KEY_A) {
            Driver.steerLeft = true;
        } else if (event.which == KEY_D) {
            Driver.steerRight = true;
        }
    }
}

function keyUp(event) {
    if (Outrun.scene == IN_GAME_SCENE) {
        if (event.which == KEY_W) {
            Driver.accelerate = false;
        } else if (event.which == KEY_S) {
            Driver.decelerate = false;
        } else if (event.which == KEY_A) {
            Driver.steerLeft = false;
        } else if (event.which == KEY_D) {
            Driver.steerRight = false;
        }
    }
}