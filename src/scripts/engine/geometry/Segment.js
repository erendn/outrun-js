import ConfigManager from "../core/ConfigManager.js";
import Camera from "./Camera.js";
import Vector3 from "./Vector3.js";

export default class Segment {

    constructor(prev, curve, hill, isDark) {
        const segmentDepth = ConfigManager.get("segment_depth");
        if (prev == null) {
            prev = {
                _curve: 0,
                _hill: 0,
                _highCenter: new Vector3(0, 0, 0),
            };
        }
        this._curve = prev._curve + curve;
        this._hill = prev._hill + hill;
        this._lowCenter = prev._highCenter;
        this._highCenter = new Vector3(this._lowCenter.x + curve, this._lowCenter.y + hill, this._lowCenter.z + segmentDepth);
        this._isDark = isDark;
        this._tiles = [];
    }

    addTile(tile) {
        this._tiles.push(tile);
    }

    project() {
        const zDiff = this._highCenter.z - Camera.position.z;
        this._highCenter.project();
        for (let i = 0; i < this._tiles.length; ++i) {
            this._tiles[i].project(zDiff);
        }
    }

    draw() {
        for (let i = 0; i < this._tiles.length; ++i) {
            this._tiles[i].draw(this._isDark);
        }
    }

}