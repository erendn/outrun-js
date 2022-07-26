import AssetLoader from "../engine/core/AssetLoader.js";
import Tile from "../engine/render/Tile.js";
import Game from "../Game.js";
import { LINE_SKEW, LINE_WIDTH } from "../constants/Tiles.js";

/**
 * This class represents a line tile in the game.
 */
export default class LineTile extends Tile {

    constructor(prev, segment, skewMultiply=1) {
        super(prev, segment, LINE_SKEW * skewMultiply, LINE_WIDTH, false);
    }

    /**
     * Return the color of the tile.
     */
    getColor(isDark) {
        const colors = AssetLoader.getColor("codes")[Game.route];
        return isDark ? colors.darkLineColor : colors.lightLineColor;
    }

}