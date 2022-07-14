import Camera from "../render/Camera.js";
import Canvas from "../render/Canvas.js";
import Vector2 from "./Vector2.js";
import { thales } from "./Utils.js";

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
     * Project this point on the screen.
     */
    project() {
        const xDiff = this.x - Camera.position.x;
        const yDiff = Camera.position.y - this.y;
        const zDiff = this.z - Camera.position.z;
        this.onScreen.x = Canvas.width / 2 + thales(Camera.gap, xDiff, zDiff);
        this.onScreen.y = Canvas.height / 2 + thales(Camera.gap, yDiff, zDiff);
    }

}