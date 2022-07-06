import Camera from "./Camera.js";
import Canvas from "./Canvas.js";
import Vector2 from "./Vector2.js";

/**
 * This is the 3D vector class.
 */
export default class Vector3 {

    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        // This point's projection on the screen
        this.onScreen = new Vector2(0, 0);
    }

    /**
     * Calculate the ratioed size of a length based on two measures on the same axis.
     */
    static calculate(length, measure1, measure2) {
        return length * measure1 / measure2;
    }

    /**
     * Project this point on the screen.
     */
    project() {
        let zDiff = this.z - Camera.position.z;
        this.onScreen.x = Canvas.width / 2 + Camera.gap * (this.x - Camera.position.x) / zDiff;
        this.onScreen.y = Canvas.height / 2 + Camera.gap * (Camera.position.y - this.y) / zDiff;
    }

}