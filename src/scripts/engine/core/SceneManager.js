/**
 * This class manages the scenes in the game.
 */
class SceneManager {

    constructor() {
        this.currentScene = null;
    }

    /**
     * Set the current scene of the game.
     */
    set(nextScene) {
        this.currentScene = nextScene;
    }

    /**
     * Return the current scene of the game.
     */
    get() {
        return this.currentScene;
    }

}

const _SceneManager = new SceneManager(); // Singleton instance
export default _SceneManager;