import Vector2 from "../engine/geometry/Vector2.js";
import Font from "../engine/render/Font.js";
import { applyColor } from "./Utils.js";
import * as ASCII from "../constants/Ascii.js";

/**
 * Class for the medium font of the game.
 */
export default class MediumFont extends Font {

    constructor(color) {
        super(WIDTH, HEIGHT, "medium-font");
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
        if ((ASCII._A <= ascii && ascii <= ASCII._Z) || (ASCII._a <= ascii && ascii <= ASCII._z)) {
            let letterNum = ascii - (ascii <= ASCII._Z ? ASCII._A : ASCII._a);
            x = letterNum % 10;
            y = Math.floor(letterNum / 10);
        }
        return new Vector2(x * WIDTH, y * HEIGHT);
    }

}

const WIDTH = 8;
const HEIGHT = 8;