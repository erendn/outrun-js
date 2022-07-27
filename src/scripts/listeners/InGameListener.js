import EventListener from "../engine/core/EventListener.js";
import Camera from "../engine/render/Camera.js";
import { normalize } from "./Utils.js";
import * as KEYS from "../constants/KeyCodes.js";
import { IN_GAME_SCENE } from "../constants/Scenes.js";

/**
 * This class is the event listener for the IN_GAME_SCENE.
 */
class InGameListener {

    constructor() {
        EventListener.addListener(IN_GAME_SCENE, this);
    }

    /**
     * Event function for the onkeydown event.
     */
    keyDown(event) {
        const key = normalize(event.which);
        if (key == KEYS.KEY_UP) {
            Camera.position.z += 50;
        } else if (key == KEYS.KEY_DOWN) {
            Camera.position.z -= 50;
        } else if (key == KEYS.KEY_LEFT) {
            Camera.position.x -= 50;
        } else if (key == KEYS.KEY_RIGHT) {
            Camera.position.x += 50;
        }
    }

    /**
     * Event function for the onkeyup event.
     */
    keyUp(event) {

    }

}

const _InGameListener = new InGameListener(); // Singleton instance
export default _InGameListener;