import AssetLoader from "../engine/core/AssetLoader.js";
import Tile from "../engine/geometry/Tile.js";
import { Outrun } from "../Game.js";
import { LINE_SKEW, LINE_WIDTH } from "../constants/TileConstants.js";

export default class LineTile extends Tile {

    constructor(prev, segment, skewMultiply=1) {
        super(prev, segment, LINE_SKEW * skewMultiply, LINE_WIDTH, false);
    }

    getColor(isDark) {
        const colors = AssetLoader.getColor("codes")[Outrun.route];
        return isDark ? colors.darkLineColor : colors.lightLineColor;
    }

}