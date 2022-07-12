import AssetLoader from "../engine/core/AssetLoader.js";
import Tile from "../engine/geometry/Tile.js";
import { Outrun } from "../Game.js";
import { ASPHALT_WIDTH } from "./AsphaltTile.js";

export default class SideTile extends Tile {

    constructor(prev, segment) {
        super(prev, segment, SIDE_SKEW, SIDE_WIDTH, false);
    }

    getColor(isDark) {
        const colors = AssetLoader.getColor("codes")[Outrun.route];
        return isDark ? colors.darkSideColor : colors.lightSideColor;
    }

}

const SIDE_WIDTH = 300; // Ground's width is infinite
// const SIDE_SKEW = (SIDE_WIDTH - ASPHALT_WIDTH) / 2; // Ground is not skewed
const SIDE_SKEW = 0; // Ground is not skewed

// FIXME: Don't export this
export { SIDE_WIDTH };