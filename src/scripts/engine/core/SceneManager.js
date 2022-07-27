/**
 * This class manages the scenes in the game.
 */
class SceneManager {

    constructor() {
        this._currentScene = null;
    }

    /**
     * Set the current scene of the game.
     */
    set(nextScene) {
        this._currentScene = nextScene;
    }

    /**
     * Return the current scene of the game.
     */
    get() {
        return this._currentScene;
    }

}

const _SceneManager = new SceneManager(); // Singleton instance
export default _SceneManager;