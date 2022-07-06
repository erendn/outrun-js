import Camera from "./Camera.js";
import Vector2 from "./Vector2.js";
import Vector3 from "./Vector3.js";

/**
 * This class represents a ground tile in the game.
 */
export class Tile {

    constructor(prevTile, highCenter) {
        this.lowCenter = prevTile.highCenter;
        this.highCenter = highCenter;
        this.space = prevTile.space;
        this.width = prevTile.width;
        this.downLeft = prevTile.upLeft;
        this.downRight = prevTile.upRight;
        this.upLeft = new Vector2();
        this.upRight = new Vector2();
    }

    getCorners() {
        // FIXME: Remove the Vector3 part below
        if (this.downLeft instanceof Vector3) {
            return [this.upLeft, this.upRight, this.downRight.onScreen, this.downLeft.onScreen];
        }
        return [this.upLeft, this.upRight, this.downRight, this.downLeft];
    }

    /**
     * This function is called once at each game cycle by the mainLoop()
     * function in the Game class.
     */
    project(measure2) {
        let relSpace = Vector3.calculate(this.space, Camera.gap, measure2);
        let relWidth = Vector3.calculate(this.width, Camera.gap, measure2);
        this.upLeft.x = this.highCenter.onScreen.x + relSpace - relWidth / 2;
        this.upLeft.y = this.highCenter.onScreen.y;
        this.upRight.x = this.highCenter.onScreen.x + relSpace + relWidth / 2;
        this.upRight.y = this.highCenter.onScreen.y;
    }

    /**
     * Project the tile with given relative space and relative width values.
     */
    calculate(relSpace, relWidth) {
        this.upLeft.x = this.highCenter.onScreen.x + relSpace - relWidth / 2;
        this.upLeft.y = this.highCenter.onScreen.y;
        this.upRight.x = this.highCenter.onScreen.x + relSpace + relWidth / 2;
        this.upRight.y = this.highCenter.onScreen.y;
    }

}