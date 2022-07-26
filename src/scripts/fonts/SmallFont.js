import Vector2 from "../engine/geometry/Vector2.js";
import Font from "../engine/render/Font.js";
import { applyColor } from "./Utils.js";
import * as ASCII from "../constants/Ascii.js";

/**
 * Class for the small font of the game.
 */
export default class SmallFont extends Font {

    constructor(color) {
        super(WIDTH, HEIGHT, "small-font");
        this._color = color;
    }

    /**
     * Process the image of this font.
     */
    _processFont() {
        const imageData = super._getImageData();
        applyColor(imageData, this._color);
        super.image = super._makeImage(imageData);
    }

    /**
     * Return the position of a character in the font.
     */
    getPosition(char) {
        let x = -1;
        let y = -1;
        const ascii = char.charCodeAt(0);
        if (ASCII._0 <= ascii && ascii <= ASCII._9) {
            x = ascii - ASCII._0;
            y = 0;
        } else if ((ASCII._A <= ascii && ascii <= ASCII._Z) || (ASCII._a <= ascii && ascii <= ASCII._z)) {
            let letterNum = ascii - (ascii <= ASCII._Z ? ASCII._A : ASCII._a);
            x = letterNum % 10;
            y = Math.floor(letterNum / 10) + 1;
        } else if (ascii == ASCII._DOT) {
            x = 6;
            y = 3;
        } else if (ascii == ASCII._EXCLAMATION) {
            x = 7;
            y = 3;
        } else if (ascii == ASCII._QUESTION) {
            x = 8;
            y = 3;
        } else if (ascii == ASCII._UNDERSCORE) {
            x = 9;
            y = 3;
        } else if (ascii == ASCII._APOSTROPHE) {
            x = 0;
            y = 4;
        } else if (ascii == ASCII._QUOTE) {
            x = 1;
            y = 4;
        }
        return new Vector2(x * WIDTH, y * HEIGHT);
    }

}

const WIDTH = 8;
const HEIGHT = 8;