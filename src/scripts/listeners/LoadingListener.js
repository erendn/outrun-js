import EventListener from "../engine/core/EventListener.js";
import { LOADING_SCENE } from "../constants/Scenes.js";

/**
 * This class is the event listener for the LOADING_SCENE.
 */
class LoadingListener {

    constructor() {
        EventListener.addListener(LOADING_SCENE, this);
    }

    /**
     * Event function for the onkeydown event.
     */
    keyDown(event) { }

    /**
     * Event function for the onkeyup event.
     */
    keyUp(event) { }

}

const _LoadingListener = new LoadingListener(); // Singleton instance
export default _LoadingListener;