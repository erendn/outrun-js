import AudioPlayer from "../engine/core/AudioPlayer.js";
import EventListener from "../engine/core/EventListener.js";
import SceneManager from "../engine/core/SceneManager.js";
import * as KEYS from "../constants/KeyCodes.js";
import { MENU_SCENE, RADIO_SCENE } from "../constants/Scenes.js";

/**
 * This class is the event listener for the MENU_SCENE.
 */
class MenuListener {

    constructor() {
        EventListener.addListener(MENU_SCENE, this);
    }

    /**
     * Event function for the onkeydown event.
     */
    keyDown(event) {
        const key = event.which;
        if (key == KEYS.KEY_ENTER) {
            SceneManager.set(RADIO_SCENE);
            AudioPlayer.play("sample/coin");
        }
    }

    /**
     * Event function for the onkeyup event.
     */
    keyUp(event) {

    }

}

const _MenuListener = new MenuListener(); // Singleton instance
export default _MenuListener;