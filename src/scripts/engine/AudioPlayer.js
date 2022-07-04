import AssetLoader from "./AssetLoader.js";
import ConfigManager from "./ConfigManager.js";

/**
 * This class manages all audio in the game.
 */
class AudioPlayer {

    constructor() {
        this._activeSounds = []; // Actively running audio objects
    }

    /**
     * Event handler function when an audio stops playing.
     */
    _stopHandler(soundName, loop) {
        const index = this._activeSounds.indexOf(soundName);
        if (index > -1) {
            this._activeSounds.splice(index, 1);
        }
        if (loop) {
            this.play(soundName, loop);
        }
    }

    /**
     * Play a sound with it the name of its file.
     */
    play(soundName, loop=false) {
        if (this._activeSounds.indexOf(soundName) > -1) {
            console.log("WARNING: Audio \"" + soundName + "\" was already playing. Might have been triggered unnecessarily.");
        } else {
            const sound = AssetLoader.getSound(soundName);
            sound.volume = ConfigManager.get("volume");
            sound.addEventListener("ended", () => {this._stopHandler(soundName, loop)}, HANDLER_OPTS);
            sound.play().catch(() => {
                // Try again when user interacts with the document
                document.addEventListener("keydown", () => {this.play(soundName, loop)}, HANDLER_OPTS);
            });
        }
    }

    /**
     * Stop a sound with the name of its file.
     */
    stop(soundName) {
        // FIXME: Stopped sounds should not be played with the this.play()
        // function because this.stop() function does not remove the event
        // listeners.
        const sound = AssetLoader.getSound(soundName);
        sound.pause();
        sound.currentTime = 0;
    }

    /**
     * Set the volume of all audio files.
     */
    volume(percentage) {
        percentage = Math.min(Math.max(percentage, 1), 0);
        for (let i = 0; i < this._activeSounds.length; ++i) {
            sounds[this._activeSounds[i]].volume = percentage;
        }
    }

}

const HANDLER_OPTS = { once: true }; // Options for event handler functions

const _AudioPlayer = new AudioPlayer(); // Singleton instance
export default _AudioPlayer;