import AudioPlayer from "../engine/core/AudioPlayer.js";
import EventListener from "../engine/core/EventListener.js";
import SceneManager from "../engine/core/SceneManager.js";
import Game from "../Game.js";
import Radio from "../Radio.js";
import { normalize } from "./Utils.js";
import * as KEYS from "../constants/KeyCodes.js";
import { RADIO_SCENE, IN_GAME_SCENE } from "../constants/Scenes.js";

/**
 * This class is the event listener for the RADIO_SCENE.
 */
class RadioListener {

    constructor() {
        EventListener.addListener(RADIO_SCENE, this);
    }

    /**
     * Event function for the onkeydown event.
     */
    keyDown(event) {
        const key = normalize(event.which);
        if (key == KEYS.KEY_LEFT) {
            if (Radio.music != 0) {
                Radio.music--;
            }
        } else if (key == KEYS.KEY_RIGHT) {
            if (Radio.music != 2) {
                Radio.music++;
            }
        } else if (key == KEYS.KEY_ENTER) {
            AudioPlayer.stop("sample/wave");
            Game.setup();
            SceneManager.set(IN_GAME_SCENE);
        }
    }

    /**
     * Event function for the onkeyup event.
     */
    keyUp(event) {

    }

}

const _RadioListener = new RadioListener(); // Singleton instance
export default _RadioListener;