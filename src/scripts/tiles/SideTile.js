import AssetLoader from "../engine/core/AssetLoader.js";
import Tile from "../engine/geometry/Tile.js";
import { Outrun } from "../Game.js";
import { SIDE_SKEW, SIDE_WIDTH } from "../constants/TileConstants.js";

export default class SideTile extends Tile {

    constructor(prev, segment, skewMultiply=1) {
        super(prev, segment, SIDE_SKEW * skewMultiply, SIDE_WIDTH, false);
    }

    getColor(isDark) {
        const colors = AssetLoader.getColor("codes")[Outrun.route];
        return isDark ? colors.darkSideColor : colors.lightSideColor;
    }

}