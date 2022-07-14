import AssetLoader from "../engine/core/AssetLoader.js";
import Tile from "../engine/render/Tile.js";
import Game from "../Game.js";
import { SIDE_SKEW, SIDE_WIDTH } from "../constants/TileConstants.js";

/**
 * This class represents a side tile in the game.
 */
export default class SideTile extends Tile {

    constructor(prev, segment, skewMultiply=1) {
        super(prev, segment, SIDE_SKEW * skewMultiply, SIDE_WIDTH, false);
    }

    /**
     * Return the color of the tile.
     */
    getColor(isDark) {
        const colors = AssetLoader.getColor("codes")[Game.route];
        return isDark ? colors.darkSideColor : colors.lightSideColor;
    }

}