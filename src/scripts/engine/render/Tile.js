import Camera from "./Camera.js";
import Canvas from "../render/Canvas.js";
import Vector2 from "../geometry/Vector2.js";
import Vector3 from "../geometry/Vector3.js";

/**
 * This class represents a ground tile in the game.
 */
export default class Tile {

    constructor(prev, segment, skew, width, infinite=false) {
        this.lowCenter = segment._lowCenter;
        this.highCenter = segment._highCenter;
        this.skew = skew;
        this.width = width;
        this.infinite = infinite;
        if (prev == null) {
            prev = {
                upLeft: new Vector2(0, 0),
                upRight: new Vector2(0, 0),
            }
        }
        this.downLeft = prev.upLeft;
        this.downRight = prev.upRight;
        this.upLeft = new Vector2(0, 0);
        this.upRight = new Vector2(0, 0);
    }

    getColor() {
        throw new Error("Implement the getColor() method in the child class.");
    }

    getCorners() {
        return [this.upLeft, this.upRight, this.downRight, this.downLeft];
    }

    /**
     * This function is called once at each game cycle by the mainLoop()
     * function in the Game class.
     */
    project(zDiff) {
        let relSkew = Vector3.calculate(this.skew, Camera.gap, zDiff);
        let relWidth = Vector3.calculate(this.width, Camera.gap, zDiff);
        this.upLeft.x = this.infinite ? 0 : this.highCenter.onScreen.x + relSkew - relWidth / 2;
        this.upLeft.y = this.highCenter.onScreen.y;
        this.upRight.x = this.infinite ? Canvas.width : this.highCenter.onScreen.x + relSkew + relWidth / 2;
        this.upRight.y = this.highCenter.onScreen.y;
    }

    /**
     * Project the tile with given relative space and relative width values.
     */
    calculate(relSkew, relWidth) {
        this.upLeft.x = this.highCenter.onScreen.x + relSkew - relWidth / 2;
        this.upLeft.y = this.highCenter.onScreen.y;
        this.upRight.x = this.highCenter.onScreen.x + relSkew + relWidth / 2;
        this.upRight.y = this.highCenter.onScreen.y;
    }

    draw(isDark) {
        Canvas.drawShape(this.getCorners(), this.getColor(isDark));
    }

}