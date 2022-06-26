import { sprites } from "./Assets.js";

/**
 * This is the canvas (aka camera screen).
 */
class Canvas2D {

    constructor() {
        this.canvas = document.getElementById("screen"); // HTML canvas
        this.canvasContext = this.canvas.getContext("2d"); // 2D context of the HTML canvas
        this.canvas.width = 320; // Width of the HTML canvas
        this.canvas.height = 224; // Height of the HTML canvas
        // Resize the canvas keeping the original ratio
        if (window.innerWidth / window.innerHeight <= canvasRatio) {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerWidth / canvasRatio;
        } else {
            this.canvas.width = window.innerHeight * canvasRatio;
            this.canvas.height = window.innerHeight;
        }
        this.width = 320; // Original width of the canvas
        this.height = 224; // Original height of the canvas
        // Prepare a gradient for later use
        this.gradient = this.canvasContext.createLinearGradient(0, 0, 0, 200);
        this.gradient.addColorStop(1, "white");
    }

    /**
     * Clear the canvas.
     */
    clear() {
        this.canvasContext.clearRect(0, 0, this.width, this.height);
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
        this.canvasContext.drawImage(image, center.xScreen - width / 2, center.yScreen - height, width, height);
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
    drawShape(point1, point2, point3, point4, color) {
        this.canvasContext.beginPath();
        this.canvasContext.moveTo(point1.xScreen, point1.yScreen);
        this.canvasContext.lineTo(point2.xScreen, point2.yScreen);
        this.canvasContext.lineTo(point3.xScreen, point3.yScreen);
        this.canvasContext.lineTo(point4.xScreen, point4.yScreen);
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
            this.drawStaticImage(sprites["hud-" + text.charAt(text.length - i - 1)], 19 - i * 8, 209, 7, 12);
        }

    }

    /**
     * Fix the canvas by redrawing it to fill the HTML canvas.
     */
    fix() {
        this.canvasContext.mozImageSmoothingEnabled = false;
        this.canvasContext.imageSmoothingEnabled = false;
        this.canvasContext.drawImage(this.canvas, 0, 0, this.width, this.height, 0, 0, this.canvas.width, this.canvas.height);
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

const canvasRatio = 1.42857142857; // Original ratio of the canvas

export const Canvas = new Canvas2D(); // Singleton instance of Canvas2D