import AssetLoader from "../core/AssetLoader.js";
import ConfigManager from "../core/ConfigManager.js";

/**
 * This is the canvas (aka camera screen).
 */
class Canvas2D {

    constructor() {
        this.canvas = [];
        this.context = [];
        this.gradient = [];
        this.setup();
    }
    
    /**
     * Setup the canvas.
     */
    setup() {
        const depth = ConfigManager.get("canvas_depth"); // Depth of the HTML canvas (aka number of canvases)
        const width = ConfigManager.get("canvas_width"); // Width of the HTML canvas
        const height = ConfigManager.get("canvas_height"); // Height of the HTML canvas
        for (let i = 0; i < depth; ++i) {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d", CANVAS_CONFIG);
            canvas.width = width;
            canvas.height = height;
            const canvasRatio = width / height; // Original ratio of the canvas
            // Resize the canvas' style keeping the original ratio
            if (window.innerWidth / window.innerHeight <= canvasRatio) {
                canvas.style.width = window.innerWidth;
                canvas.style.height = window.innerWidth / canvasRatio;
            } else {
                canvas.style.width = window.innerHeight * canvasRatio;
                canvas.style.height = window.innerHeight;
            }
            this.width = width; // Original width of the canvas
            this.height = height; // Original height of the canvas
            // Prepare a gradient for later use
            const gradient = context.createLinearGradient(0, 0, 0, 200);
            gradient.addColorStop(1, "white");
            // Disable image smoothing for better graphics
            context.mozImageSmoothingEnabled = false;
            context.imageSmoothingEnabled = false;
            // Add this canvas to the array
            this.canvas.push(canvas);
            this.context.push(context);
            this.gradient.push(gradient);
            // Append this canvas on the document
            document.body.appendChild(canvas);
        }
    }

    /**
     * Clear the canvas.
     */
    clear(depth) {
        this.context[depth].clearRect(0, 0, this.width, this.height);
    }

    /**
     * Fill the canvas with a color.
     */
    fill(depth, color) {
        this.context[depth].fillStyle = color;
        this.context[depth].fillRect(0, 0, this.width, this.height);
    }

    /**
     * Fill the canvas with a color gradient.
     */
    fillGradient(depth, color) {
        this.gradient[depth].addColorStop(0, color);
        this.context[depth].fillStyle = this.gradient[depth];
        this.context[depth].fillRect(0, 0, this.width, this.height);
    }

    /**
     * Draw an image on the canvas with its center point and dimension.
     */
    drawImage(depth, image, center, width, height) {
        this.context[depth].drawImage(image, center.x - width / 2, center.y - height, width, height);
    }

    /**
     * Draw a static image on the canvas with its top left corner and dimension.
     */
    drawStaticImage(depth, image, x, y, width, height) {
        this.context[depth].drawImage(image, x, y, width, height);
    }

    /**
     * Draw a tetragon with its points and color given.
     */
    drawShape(depth, points, color) {
        for (let i = 0; i < points.length; ++i) {
            points[i].x = Math.ceil(points[i].x) + (0 < i && i < 3 ? 0.5 : -0.5);
            points[i].y = Math.ceil(points[i].y) + 0.5;
        }
        this.context[depth].beginPath();
        this.context[depth].moveTo(points[0].x, points[0].y);
        this.context[depth].lineTo(points[1].x, points[1].y);
        this.context[depth].lineTo(points[2].x, points[2].y);
        this.context[depth].lineTo(points[3].x, points[3].y);
        this.context[depth].fillStyle = color;
        this.context[depth].fill();
        this.context[depth].strokeStyle = color;
        this.context[depth].stroke();
    }

    /**
     * Draw a text on the screen.
     */
    drawText(depth, font, text, tileX, tileY) {
        const tilemapWidth = ConfigManager.get("tilemap_width");
        const tilemapHeight = ConfigManager.get("tilemap_height");
        for (let i = 0; i < text.length; i++) {
            const fontPos = font.getPosition(text.charAt(i));
            this.context[depth].drawImage(font.image,
                                          fontPos.x, fontPos.y, font.width, font.height,
                                          (tileX + i) * tilemapWidth, tileY * tilemapHeight, font.width, font.height);
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
    antialias: false,
    depth: false,
}

const _Canvas2D = new Canvas2D(); // Singleton instance
export default _Canvas2D;