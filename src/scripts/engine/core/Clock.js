import ConfigManager from "./ConfigManager.js";

/**
 * This class imitates a CPU clock to trigger subscribed functions in
 * predetermined intervals.
 */
class Clock {

    constructor() {
        this._active = false; // Whether the clock is still running
        this._stop = false; // Whether the clock will stop soon
        this._subs = []; // Subscribed functions
        this._lastTickTime = Date.now(); // Milliseconds of the last tick
        this.lastFPS = 0; // FPS of the last frame
    }

    /**
     * This is called in each cycle.
     */
    _tick() {
        const FPS = ConfigManager.get("clock_freq");
        const currentTickTime = Date.now();
        if (currentTickTime - _Clock._lastTickTime >= 1000 / FPS) {
            _Clock._active = true; // Clock is still running
            // Stop the clock if flagged
            if (_Clock._stop) {
                _Clock._active = false;
                _Clock._stop = false;
                return;
            }
            for (let i = 0; i < _Clock._subs.length; ++i) {
                _Clock._subs[i](); // Call the given function
            }
            _Clock.lastFPS = 1000 / (currentTickTime - _Clock._lastTickTime);
            _Clock._lastTickTime = currentTickTime;
        }
        requestAnimationFrame(_Clock._tick);
    }

    /**
     * Subscribe a new function to the clock.
     */
    subscribe(func) {
        this._subs.push(func);
    }

    /**
     * Unsubscribe a function from the clock.
     */
    unsubscribe(func) {
        const index = this._subs.indexOf(func);
        if (index > -1) {
            this._subs.splice(index, 1);
        }
    }

    /**
     * Start the clock.
     */
    startClock() {
        if (!this._active) {
            this._tick();
        } else {
            console.log("WARNING: Clock is already running. Might be triggered unnecessarily.");
        }
    }

    /**
     * Stop the clock.
     */
    stopClock() {
        if (this._active) {
            this._stop = true;
        } else {
            console.log("WARNING: Clock has already stopped. Might be triggered unnecessarily.");
        }
    }

}

const _Clock = new Clock(); // Singleton instance
export default _Clock;