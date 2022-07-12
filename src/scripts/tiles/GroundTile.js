import AssetLoader from "../engine/core/AssetLoader.js";
import Tile from "../engine/geometry/Tile.js";
import { Outrun } from "../Game.js";

export default class GroundTile extends Tile {

    constructor(prev, segment) {
        super(prev, segment, GROUND_SKEW, GROUND_WIDTH, true);
    }

    getColor(isDark) {
        const colors = AssetLoader.getColor("codes")[Outrun.route];
        return isDark ? colors.darkOffroadColor : colors.lightOffroadColor;
    }

}

const GROUND_SKEW = 0; // Ground is not skewed
const GROUND_WIDTH = 1; // Ground's width is infinite