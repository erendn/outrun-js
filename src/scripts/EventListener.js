import AudioManager from "./engine/AudioManager.js";
import Radio from "./Radio.js";
import { Outrun, MENU_SCENE, RADIO_SCENE, IN_GAME_SCENE } from "./Game.js";
import { loading, maxLoading } from "./Assets.js";
import { Driver } from "./GameWorld.js";

/**
 * This is the event listener class. It listens to the keyboard events.
 */
export class EventListener {

    constructor() {
        document.onkeydown = this.keyDown;
        document.onkeyup = this.keyUp;
    }

    /**
     * Normalize the key codes.
     */
    static normalize(key) {
        switch(key) {
            case KEY_W: return KEY_UP;
            case KEY_A: return KEY_LEFT;
            case KEY_S: return KEY_DOWN;
            case KEY_D: return KEY_RIGHT;
            default: return key;
        }
    }

    /**
     * The function to be called when a key is down.
     */
    keyDown(event) {
        const key = EventListener.normalize(event.which);
        if (loading == maxLoading) {
            if (Outrun.scene == MENU_SCENE) {
                if (key == KEY_ENTER) {
                    Outrun.scene = RADIO_SCENE;
                    AudioManager.play("coin");
                }
            } else if (Outrun.scene == RADIO_SCENE) {
                if (key == KEY_LEFT) {
                    if (Radio.music != 0)
                        Radio.music--;
                } else if (key == KEY_RIGHT) {
                    if (Radio.music != 2)
                        Radio.music++;
                } else if (key == KEY_ENTER) {
                    AudioManager.stop("wave");
                    Outrun.newGame();
                    Outrun.scene = IN_GAME_SCENE;
                }
            } else if (Outrun.scene == IN_GAME_SCENE) {
                if (key == KEY_UP) {
                    Driver.accelerate = true;
                } else if (key == KEY_DOWN) {
                    Driver.decelerate = true;
                } else if (key == KEY_LEFT) {
                    Driver.steerLeft = true;
                } else if (key == KEY_RIGHT) {
                    Driver.steerRight = true;
                }
            }
        }
    }

    /**
     * The function to be called when a key is up.
     */
    keyUp(event) {
        const key = EventListener.normalize(event.which);
        if (Outrun.scene == IN_GAME_SCENE) {
            if (key == KEY_UP) {
                Driver.accelerate = false;
            } else if (key == KEY_DOWN) {
                Driver.decelerate = false;
            } else if (key == KEY_LEFT) {
                Driver.steerLeft = false;
            } else if (key == KEY_RIGHT) {
                Driver.steerRight = false;
            }
        }
    }

}

const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;
const KEY_ENTER = 13;
const KEY_SPACE = 32;
const KEY_UP = 38;
const KEY_LEFT = 37;
const KEY_DOWN = 40;
const KEY_RIGHT = 39;