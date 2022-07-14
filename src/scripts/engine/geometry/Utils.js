/**
 * Return the length of the closer side using the Thales' theorem.
 */
export function thales(farSideLength, shortSideForRatio, longSideForRatio) {
    return farSideLength * shortSideForRatio / longSideForRatio;
}