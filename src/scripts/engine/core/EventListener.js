import SceneManager from "./SceneManager.js";

/**
 * This is the class that manages all event listeners by the current scene of
 * the game.
 */
class EventListener {

    constructor() {
        this._listeners = new Map(); // Map to store all listeners
        document.onkeydown = this.keyDown;
        document.onkeyup = this.keyUp;
    }

    /**
     * Return the current event listener.
     */
    _getListener() {
        return this._listeners.get(SceneManager.get());
    }

    /**
     * Add a new event listener.
     */
    addListener(scene, listener) {
        this._listeners.set(scene, listener);
    }

    /**
     * Event function for the onkeydown event.
     */
    keyDown(event) {
        _EventListener._getListener().keyDown(event);
    }

    /**
     * Event function for the onkeyup event.
     */
    keyUp(event) {
        _EventListener._getListener().keyUp(event);
    }

}

const _EventListener = new EventListener(); // Singleton instance
export default _EventListener;