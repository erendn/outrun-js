import Vector3 from "./engine/Vector3.js";
import { Tile } from "./Tile.js";
import { WorldObject } from "./WorldObject.js";
import { Driver } from "./GameWorld.js";
import { dimensions } from "./Assets.js";
import { Outrun } from "./Game.js";

/**
 * This class represents a road segment.
 */
export class Segment {

    constructor(prevSegment, curve, hill, index, isInitial, isTunnel) {
        this.numLanes = prevSegment.numLanes; // Number of lanes in this segment
        this.isInitial = isInitial; // Whether this is the road's first segment
        this.curve = prevSegment.curve + curve; // Curve angle
        this.hill = prevSegment.hill + hill; // Hill amount
        this.lowCenter = prevSegment.highCenter; // Low center point
        this.highCenter = new Vector3(this.lowCenter.x + curve, this.lowCenter.y + hill, this.lowCenter.z + segmentDepth); // High center point
        this.isDark = index % (2 * invisSegment) < invisSegment; // Whether this tile has darker colors
        this.offroad = new Tile(prevSegment.offroad, this.highCenter); // Offroad tile
        this.asphalt = new Tile(prevSegment.asphalt, this.highCenter); // Asphalt tile
        this.leftSide = new Tile(prevSegment.leftSide, this.highCenter); // Left side tile
        this.rightSide = new Tile(prevSegment.rightSide, this.highCenter); // Right side tile
        // Road line tiles
        this.lines = [];
        for (let i = 0; i < this.numLanes - 1; i++) {
            this.lines.push(new Tile(prevSegment.lines[i], this.highCenter));
        }
        // Objects on this segment
        this.objects = [];
        if (!isTunnel) {
            if (!(index % (objectDistance / 4))) {
                this.objects.push(new WorldObject(new Vector3(this.highCenter.x, this.highCenter.y, this.highCenter.z), "terrain"));
                if (Math.random() < 0.1) {
                    this.objects.push(new WorldObject(new Vector3(this.highCenter.x, this.highCenter.y, this.highCenter.z), "left" + (Math.random() < 0.5 ? "1" : "2")));
                }
            }
            if (!(index % objectDistance)) {
                this.objects.push(new WorldObject(new Vector3(this.highCenter.x, this.highCenter.y, this.highCenter.z), "right" + (Math.random() < 0.5 ? "1" : "2")));
            }
        } else if (!(index % tunnelDistance)) {
            this.objects.push(new WorldObject(new Vector3(this.highCenter.x, this.highCenter.y, this.highCenter.z), "tunnel"));
        }
    }

    /**
     * This function is called once at each game cycle by the mainLoop()
     * function in the Game class.
     */
    project() {
        if (this.isInitial & this.lowCenter.z > Driver.camera.position.z) {
            this.offroad.downLeft.project();
            this.offroad.downRight.project();
            this.asphalt.downLeft.project();
            this.asphalt.downRight.project();
            this.leftSide.downLeft.project();
            this.leftSide.downRight.project();
            this.rightSide.downLeft.project();
            this.rightSide.downRight.project();
            for (let i = 0; i < this.numLanes - 1; i++) {
                this.lines[i].downLeft.project();
                this.lines[i].downRight.project();
            }
        }
        this.highCenter.x = this.lowCenter.x + (this.curve - Driver.curve);
        this.highCenter.project();
        let measure2 = this.highCenter.z - Driver.camera.position.z;
        this.offroad.project(measure2);
        this.asphalt.project(measure2);
        this.leftSide.project(measure2);
        this.rightSide.project(measure2);
        for (let i = 0, size = this.numLanes / 2; i < size; i++) {
            let relSpace = Vector3.calculate(this.lines[i].space, Driver.camera.gap, measure2);
            let relWidth = Vector3.calculate(this.lines[i].width, Driver.camera.gap, measure2);
            this.lines[i].calculate(relSpace, relWidth);
            this.lines[this.numLanes - 2 - i].calculate(-relSpace, relWidth);
        }
        if (this.numLanes % 2 == 0) {
            this.lines[this.numLanes / 2 + 1].project(measure2);
        }
        for (let i = 0; i < this.objects.length; i++) {
            if (dimensions[Outrun.gameWorld.route][this.objects[i].fileName] != undefined) {
                this.objects[i].center.x = this.highCenter.x + dimensions[Outrun.gameWorld.route][this.objects[i].fileName].offset;
                this.objects[i].project(measure2);
            }
        }
    }

}

export const invisSegment = 5;
export const sideLineWidth = 300; // Width of side lines
export const lineWidth = 150; // Width of road lines
export const laneWidth = 1200; // Width of road lanes
export const offroadWidth = 70000; // Width of offroad
export const segmentDepth = 600; // Depth of the segment
const objectDistance = 20; // Distance between objects
const tunnelDistance = 6; // Distance of between tunnel objects