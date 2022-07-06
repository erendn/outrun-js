import ConfigManager from "../ConfigManager.js";

/**
 * This class imitates a CPU clock to trigger subscribed functions in
 * predetermined intervals.
 */
class Clock {

    constructor() {
        this._active = false; // Whether the clock is still running
        this._stop = false; // Whether the clock will stop soon
        this._subs = []; // Subscribed functions
    }

    /**
     * This is called in each cycle.
     */
    _tick() {
        this._active = true; // Clock is still running
        // Stop the clock if flagged
        if (this._stop) {
            this._active = false;
            this._stop = false;
            return;
        }
        for (let i = 0; i < this._subs.length; ++i) {
            this._subs[i](); // Call the given function
        }
        setTimeout(() => {this._tick()}, 1000 / ConfigManager.get("clock_freq")); // Run the function again
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