import AssetLoader from "../engine/core/AssetLoader.js";
import Tile from "../engine/geometry/Tile.js";
import { Outrun } from "../Game.js";

export default class LineTile extends Tile {

    constructor(prev, segment) {
        super(prev, segment, LINE_SKEW, LINE_WIDTH, false);
    }

    getColor(isDark) {
        const colors = AssetLoader.getColor("codes")[Outrun.route];
        return isDark ? colors.darkLineColor : colors.lightLineColor;
    }

}

const LINE_SKEW = 0; // Ground is not skewed
const LINE_WIDTH = 150; // Ground's width is infinite

// FIXME: Don't export this
export { LINE_WIDTH };