import AssetLoader from "../engine/core/AssetLoader.js";
import Tile from "../engine/render/Tile.js";
import { Outrun } from "../Game.js";
import { ASPHALT_SKEW, ASPHALT_WIDTH } from "../constants/TileConstants.js";

export default class AsphaltTile extends Tile {

    constructor(prev, segment) {
        super(prev, segment, ASPHALT_SKEW, ASPHALT_WIDTH, false);
    }

    getColor(isDark) {
        const colors = AssetLoader.getColor("codes")[Outrun.route];
        return isDark ? colors.darkAsphaltColor : colors.lightAsphaltColor;
    }

}