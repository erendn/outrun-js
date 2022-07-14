import AssetLoader from "../engine/core/AssetLoader.js";
import Tile from "../engine/render/Tile.js";
import Game from "../Game.js";
import { ASPHALT_SKEW, ASPHALT_WIDTH } from "../constants/TileConstants.js";

/**
 * This class represents an asphalt tile in the game.
 */
export default class AsphaltTile extends Tile {

    constructor(prev, segment) {
        super(prev, segment, ASPHALT_SKEW, ASPHALT_WIDTH, false);
    }

    /**
     * Return the color of the tile.
     */
    getColor(isDark) {
        const colors = AssetLoader.getColor("codes")[Game.route];
        return isDark ? colors.darkAsphaltColor : colors.lightAsphaltColor;
    }

}