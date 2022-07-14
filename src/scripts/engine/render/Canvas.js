import AssetLoader from "../core/AssetLoader.js";
import ConfigManager from "../core/ConfigManager.js";

/**
 * This is the canvas (aka camera screen).
 */
class Canvas2D {

    constructor() {
        this.canvas = document.getElementById("screen"); // HTML canvas
        this.canvasContext = this.canvas.getContext("2d", CANVAS_CONFIG); // 2D context of the HTML canvas
        this.setup();
    }

    /**
     * Setup the canvas.
     */
    setup() {
        const width = ConfigManager.get("canvas_width"); // Width of the HTML canvas
        const height = ConfigManager.get("canvas_height"); // Height of the HTML canvas
        this.canvas.width = width;
        this.canvas.height = height;
        const canvasRatio = width / height; // Original ratio of the canvas
        // Resize the canvas' style keeping the original ratio
        if (window.innerWidth / window.innerHeight <= canvasRatio) {
            this.canvas.style.width = window.innerWidth;
            this.canvas.style.height = window.innerWidth / canvasRatio;
        } else {
            this.canvas.style.width = window.innerHeight * canvasRatio;
            this.canvas.style.height = window.innerHeight;
        }
        this.width = width; // Original width of the canvas
        this.height = height; // Original height of the canvas
        // Prepare a gradient for later use
        this.gradient = this.canvasContext.createLinearGradient(0, 0, 0, 200);
        this.gradient.addColorStop(1, "white");
        // Disable image smoothing for better graphics
        this.canvasContext.mozImageSmoothingEnabled = false;
        this.canvasContext.imageSmoothingEnabled = false;
    }

    /**
     * Fill the canvas with a color.
     */
    fill(color) {
        this.canvasContext.fillStyle = color;
        this.canvasContext.fillRect(0, 0, this.width, this.height);
    }

    /**
     * Fill the canvas with a color gradient.
     */
    fillGradient(color) {
        this.gradient.addColorStop(0, color);
        this.canvasContext.fillStyle = this.gradient;
        this.canvasContext.fillRect(0, 0, this.width, this.height);
    }

    /**
     * Draw an image on the canvas with its center point and dimension.
     */
    drawImage(image, center, width, height) {
        this.canvasContext.drawImage(image, center.x - width / 2, center.y - height, width, height);
    }

    /**
     * Draw a static image on the canvas with its top left corner and dimension.
     */
    drawStaticImage(image, x, y, width, height) {
        this.canvasContext.drawImage(image, x, y, width, height);
    }

    /**
     * Draw a tetragon with its points and color given.
     */
    drawShape(points, color) {
        for (let i = 0; i < points.length; ++i) {
            points[i].x = Math.ceil(points[i].x) + (0 < i && i < 3 ? 0.5 : -0.5);
            points[i].y = Math.ceil(points[i].y) + 0.5;
        }
        this.canvasContext.beginPath();
        this.canvasContext.moveTo(points[0].x, points[0].y);
        this.canvasContext.lineTo(points[1].x, points[1].y);
        this.canvasContext.lineTo(points[2].x, points[2].y);
        this.canvasContext.lineTo(points[3].x, points[3].y);
        this.canvasContext.fillStyle = color;
        this.canvasContext.fill();
        this.canvasContext.strokeStyle = color;
        this.canvasContext.stroke();
    }

    /**
     * Draw a text on the screen.
     */
    drawText(text) {
        for (let i = 0; i < text.length; i++) {
            // FIXME: Don't use sprites here
            this.drawStaticImage(AssetLoader.getSprite("hud/digits", text.charAt(text.length - i - 1)), 19 - i * 8, 209, 7, 12);
        }

    }

    /**
     * Mix two colors with the current step given.
     * TODO: Use yield for simpler implementation
     */
    mix(base, target, step) {
        // If the target color has been reached, return the color
        if (base == target)
            return base;
        let resHex = "#"; // Result hex code of current step color
        for (let i = 1; i <= 5; i += 2) {
            // Take the difference of each RGB color
            let diff = parseInt(target.substring(i, i + 2), 16) - parseInt(base.substring(i, i + 2), 16);
            // If the difference is above the step, take the color stepped
            // towards the result. Otherwise, take the target color.
            if (Math.abs(diff) >= step) {
                var add = (parseInt(base.substring(i, i + 2), 16) + step * Math.sign(diff)).toString(16).toUpperCase();
            } else {
                var add = target.substring(i, i + 2);
            }
            // Add the mixed color to the result
            resHex += (add.length == 1 ? "0" : "") + add;
        }
        return resHex;
    }

}

const CANVAS_CONFIG = {
    alpha: false,
    antialias: false,
    depth: false,
}

const _Canvas2D = new Canvas2D(); // Singleton instance
export default _Canvas2D;