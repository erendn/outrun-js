import AssetLoader from "../engine/core/AssetLoader.js";
import Tile from "../engine/geometry/Tile.js";
import { Outrun } from "../Game.js";
import { LINE_WIDTH } from "./LineTile.js";
import { SIDE_WIDTH } from "./SideTile.js";

export default class AsphaltTile extends Tile {

    constructor(prev, segment) {
        super(prev, segment, ASPHALT_SKEW, ASPHALT_WIDTH, false);
    }

    getColor(isDark) {
        const colors = AssetLoader.getColor("codes")[Outrun.route];
        return isDark ? colors.darkAsphaltColor : colors.lightAsphaltColor;
    }

}

const NUM_LANES = 6; // Number of lanes on the road
const LANE_WIDTH = 1200; // Width of a road lane
const ASPHALT_SKEW = 0; // Asphalt is not skewed
const ASPHALT_WIDTH = LANE_WIDTH * NUM_LANES + LINE_WIDTH * (NUM_LANES - 1) + SIDE_WIDTH * 2; // Asphalt's width

// FIXME: Don't export these
export { LANE_WIDTH, ASPHALT_WIDTH };