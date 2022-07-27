import * as KEYS from "../constants/KeyCodes.js";

/**
 * Setup all event listeners. This function must be called once at the
 * beginning.
 */
export async function setup() {
    await import("./LoadingListener.js");
    await import("./InGameListener.js");
    await import("./MenuListener.js");
    await import("./RadioListener.js");
}

/**
 * Normalize the key codes.
 */
export function normalize(key) {
    switch(key) {
        case KEYS.KEY_W: return KEYS.KEY_UP;
        case KEYS.KEY_A: return KEYS.KEY_LEFT;
        case KEYS.KEY_S: return KEYS.KEY_DOWN;
        case KEYS.KEY_D: return KEYS.KEY_RIGHT;
        default: return key;
    }
}