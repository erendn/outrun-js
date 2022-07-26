import AssetLoader from "../core/AssetLoader.js";

/**
 * Abstract parent class for fonts.
 */
export default class Font {

    constructor(width, height, fontName) {
        this.width = width; // Pixel width of each character
        this.height = height; // Pixel height of each character
        this._loadImage(fontName);
    }

    /**
     * Load the image of this font.
     */
    _loadImage(fontName) {
        const image = AssetLoader.getFont(fontName);
        if (image != undefined) {
            this.image = image;
            this._processFont();
        } else {
            window.requestAnimationFrame(() => this._loadImage(fontName));
        }
    }

    /**
     * Return the image data of this font's image.
     */
    _getImageData() {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        context.drawImage(this.image, 0, 0);
        return context.getImageData(0, 0, this.image.width, this.image.height);
    }

    /**
     * Create a new image with the given image data.
     */
    _makeImage(imageData) {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        context.putImageData(imageData, 0, 0);
        let image = new Image();
        image.src = canvas.toDataURL();
        return image;
    }

    /**
     * Abstract function to process the font image.
     */
    _processFont() {
        throw new Error("Implement the processFont() method in the child class.");
    }

    /**
     * Abstract function to return the position of a character in the font.
     */
    getPosition(char) {
        throw new Error("Implement the getPosition() method in the child class.");
    }

}