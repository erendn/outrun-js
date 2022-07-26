/**
 * Round all values of an array.
 */
function roundArray(array) {
    for (let i = 0; i < array.length; ++i) {
        array[i] = Math.round(array[i]);
    }
    return array;
}

/**
 * Return the HEX value of an RGB color.
 */
function RGBtoHEX(rgb) {
    const f = (color) => {
        let hex = color.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    };
    return "#" + f(rgb[0]) + f(rgb[1]) + f(rgb[2]);
}

/**
 * Return the RGB values of a HEX color.
 */
function HEXtoRGB(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
}

/**
 * Return the HSB values of an RGB color.
 */
function RGBtoHSB(rgb) {
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;
    const v = Math.max(r, g, b);
    const n = v - Math.min(r, g, b);
    const h = n === 0 ? 0 : n && v === r ? (g - b) / n : v === g ? 2 + (b - r) / n : 4 + (r - g) / n;
    const hsb = [60 * (h < 0 ? h + 6 : h), v && (n / v) * 100, v * 100];
    return roundArray(hsb);
}

/**
 * Return the RGB values of a HSB color.
 */
function HSBtoRGB(hsb) {
    const h = hsb[0];
    const s = hsb[1] / 100;
    const b = hsb[2] / 100;
    const k = (n) => (n + h / 60) % 6;
    const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
    const rgb = [255 * f(5), 255 * f(3), 255 * f(1)];
    return roundArray(rgb);
}

/**
 * Change colors of the image given the color map. The format of the colorMap
 * parameter should be:
 * {
 *     "currentColorHEX": newColorHex,
 *                  ...
 * }
 */
export function changeColors(imageData, colorMap) {
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    for (const [key, value] of Object.entries(colorMap)) {
        colorMap[key] = HEXtoRGB(value);
    }
    for (let x = 0; x < width; ++x) {
        for (let y = 0; y < height; ++y) {
            const index = (y * width + x) * 4;
            const currentRGB = [data[index], data[index + 1], data[index + 2]];
            const currentHEX = RGBtoHEX(currentRGB);
            let newRGB = currentRGB;
            for (const [key, value] of Object.entries(colorMap)) {
                if (key.toLowerCase() === currentHEX.toLowerCase()) {
                    newRGB = value;
                }
            }
            for (let i = 0; i < 3; ++i) {
                imageData.data[index + i] = newRGB[i];
            }
        }
    }
}

/**
 * Apply a color on the image given the color's HEX code.
 */
export function applyColor(imageData, color) {
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    const newHue = RGBtoHSB(HEXtoRGB(color))[0];
    for (let x = 0; x < width; ++x) {
        for (let y = 0; y < height; ++y) {
            const index = (y * width + x) * 4;
            // Change hue value while keeping saturation and brightness fixed
            const currentRGB = [data[index], data[index + 1], data[index + 2]];
            const currentHSB = RGBtoHSB(currentRGB);
            const newHSB = [newHue, currentHSB[1], currentHSB[2]];
            const newRGB = HSBtoRGB(newHSB);
            for (let i = 0; i < 3; ++i) {
                imageData.data[index + i] = newRGB[i];
            }
        }
    }
}