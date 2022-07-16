import Camera from "./Camera.js";
import Canvas from "../render/Canvas.js";
import { thales } from "../geometry/Utils.js";
import Vector2 from "../geometry/Vector2.js";
import { IN_GAME_CANVAS } from "../../constants/Canvas.js";

/**
 * This class represents a tile in the game.
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

    /**
     * Abstract function to return the color of this tile.
     */
    getColor() {
        throw new Error("Implement the getColor() method in the child class.");
    }

    /**
     * Return the corners of this tile, starting from up-left and moving clockwise.
     */
    getCorners() {
        return [this.upLeft, this.upRight, this.downRight, this.downLeft];
    }

    /**
     * This function is called once at each game cycle by the mainLoop()
     * function in the Game class.
     */
    project(zDiff) {
        const relSkew = thales(this.skew, Camera.gap, zDiff);
        const relWidth = thales(this.width, Camera.gap, zDiff);
        this.upLeft.x = this.infinite ? 0 : this.highCenter.onScreen.x + relSkew - relWidth / 2;
        this.upLeft.y = this.highCenter.onScreen.y;
        this.upRight.x = this.infinite ? Canvas.width : this.highCenter.onScreen.x + relSkew + relWidth / 2;
        this.upRight.y = this.highCenter.onScreen.y;
    }

    /**
     * Draw this tile on the canvas.
     */
    draw(isDark) {
        Canvas.drawShape(IN_GAME_CANVAS, this.getCorners(), this.getColor(isDark));
    }

}