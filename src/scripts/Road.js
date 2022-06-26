import { Segment, laneWidth, lineWidth, sideLineWidth, offroadWidth, segmentDepth } from "./Segment.js";
import { Vector3 } from "./Vector3.js";
import { Outrun } from "./Game.js";
import { Vehicle } from "./Vehicle.js";
import { WorldObject } from "./WorldObject.js";
import { sounds } from "./Assets.js";
import { Junction } from "./Junction.js";

/**
 * This class represents the road and route in the game.
 */
export class Road {

    constructor(center, curve, hill, numLanes) {
        this.trackRemain = trackLength - 1; // Remaining number of track to be generated
        this.chosenPath = []; // Chosen path by the player
        this.vehicles = []; // Vehicles in the game
        this.trackCount = 0; // Current track count
        this.segments = [new Segment(Road.prepareInitial(center, curve, hill, numLanes), curve, hill, 0, true)]; // Segments of the road
        this.addSegments(false); // Add straight segments
        // Project the first segment of the road
        this.segments[0].offroad.downLeft.project();
        this.segments[0].offroad.downRight.project();
        this.segments[0].asphalt.downLeft.project();
        this.segments[0].asphalt.downRight.project();
        this.segments[0].leftSide.downLeft.project();
        this.segments[0].leftSide.downRight.project();
        this.segments[0].rightSide.downLeft.project();
        this.segments[0].rightSide.downRight.project();
        for (let i = 0; i < numLanes - 1; i++) {
            this.segments[0].lines[i].downLeft.project();
            this.segments[0].lines[i].downRight.project();
        }
        this.startSegment = this.segments[13]; // Starting segment of the road
        this.endSegment = null; // Ending segment of the road
        // Add the flags to the start segment
        this.startSegment.objects.push(new WorldObject(new Vector3(this.startSegment.highCenter.x, this.startSegment.highCenter.y, this.startSegment.highCenter.z), "start0"));
    }

    /**
     * Prepare an initial road segment.
     */
    static prepareInitial(center, curve, hill, numLanes) {
        let asphaltWidth = laneWidth * numLanes + lineWidth * (numLanes - 1) + sideLineWidth * 2;
        let initial = {
            numLanes: numLanes,
            curve: curve,
            hill: hill,
            highCenter: center,
            offroad: {
                upLeft: new Vector3(center.x - offroadWidth / 2, center.y, center.z),
                upRight: new Vector3(center.x + offroadWidth / 2, center.y, center.z),
                highCenter: center,
                space: 0,
                width: offroadWidth
            },
            asphalt: {
                upLeft: new Vector3(center.x - asphaltWidth / 2, center.y, center.z),
                upRight: new Vector3(center.x + asphaltWidth / 2, center.y, center.z),
                highCenter: center,
                space: 0,
                width: asphaltWidth
            },
            leftSide: {
                upLeft: new Vector3(center.x - asphaltWidth / 2, center.y, center.z),
                upRight: new Vector3(center.x - asphaltWidth / 2 + sideLineWidth, center.y, center.z),
                highCenter: center,
                space: (sideLineWidth - asphaltWidth) / 2,
                width: sideLineWidth
            },
            rightSide: {
                upLeft: new Vector3(center.x + asphaltWidth / 2 - sideLineWidth, center.y, center.z),
                upRight: new Vector3(center.x + asphaltWidth / 2, center.y, center.z),
                highCenter: center,
                space: (asphaltWidth - sideLineWidth) / 2,
                width: sideLineWidth
            },
            lines: []
        };
        let leftSide = initial.leftSide;
        for (let i = 0; i < numLanes - 1; i++) {
            initial.lines.push(
                {
                    upLeft: new Vector3(leftSide.upRight.x + laneWidth + (laneWidth + lineWidth) * i, center.y, center.z),
                    upRight: new Vector3(leftSide.upRight.x + (laneWidth + lineWidth) * (i + 1), center.y, center.z),
                    highCenter: center,
                    space: leftSide.space + (sideLineWidth + lineWidth) / 2 + laneWidth + (laneWidth + lineWidth) * i,
                    width: lineWidth
                }
            );
        }
        return initial;
    }

    /**
     * Add new segments to the road.
     */
    addSegments(canCurve) {
        let curved = canCurve & Math.random() < 0.4;
        if (this.segments[this.segments.length - 1] instanceof Segment) {
            if (curved & this.trackRemain > 400 + Outrun.renderSize) {
                let curveLength = Math.random() < 0.5 ? 200 : 400;
                if (Math.random() < 0.7) {
                    this.addCurves(curveLength);
                } else {
                    this.addHills(curveLength);
                }
                this.trackRemain -= curveLength;
            } else if (this.trackRemain != 0) {
                let length = Math.min(this.trackRemain, Outrun.renderSize);
                this.addStraights(length);
                this.trackRemain -= length;
            } else {
                if (this.chosenPath.length < 4) {
                    this.addJunctions(junctionLength);
                    this.trackRemain = trackLength;
                } else {
                    Outrun.finished = true;
                    this.endSegment = this.segments[this.segments.length - 1];
                    this.endSegment.objects.push(new WorldObject(new Vector3(this.endSegment.highCenter.x, this.endSegment.highCenter.y, this.endSegment.highCenter.z), "goal"));
                    this.addStraights(Outrun.renderSize * 2);
                }
            }
        } else {
            let lastJunction = null;
            if (this.chosenPath[this.chosenPath.length - 1]) {
                lastJunction = this.segments[this.segments.length - 1].rightJunction;
                let newCenter = new Vector3(lastJunction.highCenter.x + (laneWidth * 1.5 + sideLineWidth / 2 + lineWidth / 2), lastJunction.highCenter.y, lastJunction.highCenter.z);
                this.segments.push(new Segment(Road.prepareInitial(newCenter, lastJunction.curve, lastJunction.hill, trackNumLanes), 0, 0, this.segments.length, true));
            } else {
                lastJunction = this.segments[this.segments.length - 1].leftJunction;
                let newCenter = new Vector3(lastJunction.highCenter.x - (laneWidth * 1.5 + sideLineWidth / 2 + lineWidth / 2), lastJunction.highCenter.y, lastJunction.highCenter.z);
                this.segments.push(new Segment(Road.prepareInitial(newCenter, lastJunction.curve, lastJunction.hill, trackNumLanes), 0, 0, this.segments.length, true));
            }
            this.addStraights(Outrun.renderSize);
        }
    }

    /**
     * Add curved segments to the road.
     */
    addCurves(length) {
        let direction = Math.random() < 0.5 ? -1 : 1;
        let part = length / 3;
        let vehicle = 0;
        for (let i = 0; i < part; i++) {
            this.segments.push(new Segment(this.segments[this.segments.length - 1], MAX_CURVE * (i / part) * direction, 0, this.segments.length, false));
            if (vehicle < vehicleSpawn & Math.random() < 0.01) {
                vehicle++;
                this.addVehicles(this.segments[this.segments.length - 1]);
            }
        }
        for (let i = 0; i < part; i++) {
            this.segments.push(new Segment(this.segments[this.segments.length - 1], MAX_CURVE * direction, 0, this.segments.length, false));
            if (vehicle < vehicleSpawn & Math.random() < 0.01) {
                vehicle++;
                this.addVehicles(this.segments[this.segments.length - 1]);
            }
        }
        for (let i = 0; i < part; i++) {
            this.segments.push(new Segment(this.segments[this.segments.length - 1], MAX_CURVE * (1 - i / part) * direction, 0, this.segments.length, false));
            if (vehicle < vehicleSpawn & Math.random() < 0.01) {
                vehicle++;
                this.addVehicles(this.segments[this.segments.length - 1]);
            }
        }
    }

    /**
     * Add hill segments to the road.
     */
    addHills(length) {
        let part = length / 3;
        let vehicle = 0;
        for (let i = 0; i < part; i++) {
            this.segments.push(new Segment(this.segments[this.segments.length - 1], 0, MAX_HILL * (Math.cos((2 * i / part - 1) * Math.PI) + 1), this.segments.length, false));
            if (vehicle < vehicleSpawn & Math.random() < 0.01) {
                vehicle++;
                this.addVehicles(this.segments[this.segments.length - 1]);
            }
        }
        for (let i = 0; i < part; i++) {
            this.segments.push(new Segment(this.segments[this.segments.length - 1], 0, 0, this.segments.length, false));
            if (vehicle < vehicleSpawn & Math.random() < 0.01) {
                vehicle++;
                this.addVehicles(this.segments[this.segments.length - 1]);
            }
        }
        for (let i = 0; i < part; i++) {
            this.segments.push(new Segment(this.segments[this.segments.length - 1], 0, MAX_HILL * (-Math.cos((2 * i / part - 1) * Math.PI) - 1), this.segments.length, false));
            if (vehicle < vehicleSpawn & Math.random() < 0.01) {
                vehicle++;
                this.addVehicles(this.segments[this.segments.length - 1]);
            }
        }
    }

    /**
     * Add straight segments to the road.
     */
    addStraights(length) {
        let vehicle = 0;
        for (let i = 0; i < length; i++) {
            this.segments.push(new Segment(this.segments[this.segments.length - 1], 0, 0, this.segments.length, false));
            if (vehicle < vehicleSpawn & Math.random() < 0.01) {
                vehicle++;
                this.addVehicles(this.segments[this.segments.length - 1]);
            }
        }
    }

    /**
     * Add junctions to the road.
     */
    addJunctions(length) {
        this.trackCount++;
        let lastSegment = this.segments[this.segments.length - 1];
        let initial = {
            numLanes: junctNumLanes,
            leftJunction: Road.prepareInitial(new Vector3(lastSegment.highCenter.x - (lastSegment.asphalt.width / 4 - sideLineWidth / 2 + lineWidth / 4), lastSegment.highCenter.y, lastSegment.highCenter.z), lastSegment.curve, lastSegment.hill, junctNumLanes),
            rightJunction: Road.prepareInitial(new Vector3(lastSegment.highCenter.x + (lastSegment.asphalt.width / 4 - sideLineWidth / 2 + lineWidth / 4), lastSegment.highCenter.y, lastSegment.highCenter.z), lastSegment.curve, lastSegment.hill, junctNumLanes)
        };
        this.segments.push(new Junction(initial, 0, 0, this.segments.length, true));
        let part = (length - 1) / 3;
        for (let i = 0; i < part; i++) {
            this.segments.push(new Junction(this.segments[this.segments.length - 1], MAX_CURVE * (i / part), 0, this.segments.length, false));
        }
        for (let i = 0; i < part; i++) {
            this.segments.push(new Junction(this.segments[this.segments.length - 1], MAX_CURVE, 0, this.segments.length, false));
        }
        for (let i = 0; i < part; i++) {
            this.segments.push(new Junction(this.segments[this.segments.length - 1], MAX_CURVE * (1 - i / part), 0, this.segments.length, false));
        }
        for (let i = 0; i < Outrun.renderSize; i++) {
            this.segments.push(new Junction(this.segments[this.segments.length - 1], 0, 0, this.segments.length, false));
        }
    }

    /**
     * Add vehicles to the road.
     */
    addVehicles(segment) {
        let shift = (Math.floor(Math.random() * (segment.numLanes / 2)) + 0.5) * (Math.random() < 0.5 ? 1 : -1);
        this.vehicles.push(new Vehicle(new Vector3(segment.highCenter.x, segment.highCenter.y, segment.highCenter.z), shift, "vehicle-" + Math.floor(Math.random() * 11)));
    }

    /**
     * Change the light on the starting segment.
     */
    nextLight() {
        let currentFile = this.startSegment.objects[this.startSegment.objects.length - 1].fileName;
        if (currentFile == "start0")
            this.startSegment.objects[this.startSegment.objects.length - 1].fileName = "start1";
        else if (currentFile == "start1")
            this.startSegment.objects[this.startSegment.objects.length - 1].fileName = "start2";
        else if (currentFile == "start2")
            this.startSegment.objects[this.startSegment.objects.length - 1].fileName = "start3";
        if (currentFile == "start2") {
            sounds["signal-1"].play();
            Outrun.playable = true;
        }

        else
            sounds["signal-0"].play();
    }

    /**
     * Find the segment index of a point on the road.
     */
    findIndex(position) {
        return Math.floor(position / segmentDepth) % this.segments.length;
    }

    /**
     * Find the current route of the road.
     */
    findRoute() {
        let length = this.chosenPath.length;
        let sum = this.chosenPath.reduce((a, b) => a + b, 0);
        switch (length) {
            case 0: return "coconut-beach";
            case 1:
                switch (sum) {
                    case 0: return "gateaway";
                    case 1: return "devils-canyon";
                }
            case 2:
                switch (sum) {
                    case 0: return "desert";
                    case 1: return "alps";
                    case 2: return "cloudy-mountain";
                }
            case 3:
                switch (sum) {
                    case 0: return "wilderness";
                    case 1: return "old-capital";
                    case 2: return "wheat-field";
                    case 3: return "seaside-town";
                }
            case 4:
                switch (sum) {
                    case 0: return "vineyard";
                    case 1: return "death-valley";
                    case 2: return "desolation-hill";
                    case 3: return "autobahn";
                    case 4: return "lakeside";
                }
        }
    }

}

const trackLength = 2000; // Number of segments in each track
const junctionLength = 400; // Number of segments in each junction

export const trackNumLanes = 6; // Number of lanes in the road
const junctNumLanes = 3; // Number of lanes in the junctions

const vehicleSpawn = 5; // Max number of vehicles to be added in each addition of segments

const MAX_CURVE = 1; // Max curve amount
const MAX_HILL = 10; // Max hill amount