import ConfigManager from "../core/ConfigManager.js";
import Camera from "../geometry/Camera.js";

class GameWorld {

    constructor() {
        this.reset();
    }

    *_iterateSegments() {
        const renderDist = ConfigManager.get("render_dist");
        const segmentDepth = ConfigManager.get("segment_depth");
        const startIndex = Math.floor(Camera.position.z / segmentDepth) % this._segments.length;
        const finishIndex = Math.min(this._segments.length, startIndex + renderDist) - 1;
        // Start projection from the back
        for (let i = finishIndex; i >= startIndex; --i) {
            yield this._segments[i];
        }
    }

    reset() {
        // TODO: This shouldn't cause memory leak
        this._segments = [];
    }

    addSegment(segment) {
        this._segments.push(segment);
    }

    project() {
        for (const segment of this._iterateSegments()) {
            if (segment == undefined) {
                break;
            }
            segment.project();
        }
    }

    draw() {
        for (const segment of this._iterateSegments()) {
            if (segment == undefined) {
                break;
            }
            segment.draw();
        }
    }

}

const _GameWorld = new GameWorld(); // Singleton instance
export default _GameWorld;