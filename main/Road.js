function Road(center, curve, hill, numLanes) {
    this.trackRemain = trackLength - 1;
    this.chosenPath = [];
    this.trackCount = 0;
    this.segments = [new Segment(Road.prepareInitial(center, curve, hill, numLanes), curve, hill, 0, false)];
    this.addSegments(false);
    this.segments[0].offroad.downLeft.project();
    this.segments[0].offroad.downRight.project();
    this.segments[0].asphalt.downLeft.project();
    this.segments[0].asphalt.downRight.project();
    this.segments[0].leftSide.downLeft.project();
    this.segments[0].leftSide.downRight.project();
    this.segments[0].rightSide.downLeft.project();
    this.segments[0].rightSide.downRight.project();
    for (var i = 0; i < numLanes - 1; i++) {
        this.segments[0].lines[i].downLeft.project();
        this.segments[0].lines[i].downRight.project();
    }
}

const skyColor = '#0094FF';
const darkAsphaltColor = '#949494';
const lightAsphaltColor = '#9C9C9C';
const whiteColor = '#F7F7F7';
const redColor = '#FF0000';
const darkOffroadColor = '#076348';
const lightOffroadColor = '#1d963f';

const trackLength = 400;
const junctionLength = 400;

const trackNumLanes = 6;
const junctNumLanes = 3;

const MAX_CURVE = 0.7;
const MAX_HILL = 10;

Road.prototype.addSegments = function (canCurve) {
    var curved = canCurve & Math.random() < 0.3;
    if (this.segments[this.segments.length - 1] instanceof Segment) {
        if (curved & this.trackRemain > 200) {
            var curveLength = Math.random() < 0.5 ? 100 : 200;
            if (Math.random() < 0.7) { // CURVE
                this.addCurves(curveLength);
            } else { // HILL
                this.addHills(curveLength);
            }
            this.trackRemain -= curveLength;
        } else if (this.trackRemain != 0) { // STRAIGHT
            var length = Math.min(this.trackRemain, Outrun.renderSize);
            this.addStraights(length);
            this.trackRemain -= length;
        } else {
            this.addJunctions(junctionLength);
            this.trackRemain = trackNumLanes;
        }
    } else {
        var lastJunction = null;
        if (this.chosenPath[this.chosenPath.length - 1]) {
            lastJunction = this.segments[this.segments.length - 1].leftJunction;
            var newCenter = new Vector3(lastJunction.highCenter.x - (laneWidth * 1.5 + sideLineWidth / 2 + lineWidth / 2), lastJunction.highCenter.y, lastJunction.highCenter.z);
            this.segments.push(new Segment(Road.prepareInitial(newCenter, lastJunction.curve, lastJunction.hill, trackNumLanes), 0, 0, this.segments.length, true));
        } else {
            lastJunction = this.segments[this.segments.length - 1].rightJunction;
            var newCenter = new Vector3(lastJunction.highCenter.x + (laneWidth * 1.5 + sideLineWidth / 2 + lineWidth / 2), lastJunction.highCenter.y, lastJunction.highCenter.z);
            this.segments.push(new Segment(Road.prepareInitial(newCenter, lastJunction.curve, lastJunction.hill, trackNumLanes), 0, 0, this.segments.length, true));
        }
        this.addStraights(Outrun.renderSize);
    }
}

Road.prototype.addCurves = function (length) {
    var direction = Math.random() < 0.5 ? -1 : 1;
    var part = length / 3;
    for (var i = 0; i < part; i++) {
        this.segments.push(new Segment(this.segments[this.segments.length - 1], MAX_CURVE * (i / part) * direction, 0, this.segments.length, false));
    }
    for (var i = 0; i < part; i++) {
        this.segments.push(new Segment(this.segments[this.segments.length - 1], MAX_CURVE * direction, 0, this.segments.length, false));
    }
    for (var i = 0; i < part; i++) {
        this.segments.push(new Segment(this.segments[this.segments.length - 1], MAX_CURVE * (1 - i / part) * direction, 0, this.segments.length, false));
    }
}

Road.prototype.addHills = function (length) {
    var part = length / 3;
    for (var i = 0; i < part; i++) {
        this.segments.push(new Segment(this.segments[this.segments.length - 1], 0, MAX_HILL * (Math.cos((2 * i / part - 1) * Math.PI) + 1), this.segments.length, false));
    }
    for (var i = 0; i < part; i++) {
        this.segments.push(new Segment(this.segments[this.segments.length - 1], 0, 0, this.segments.length, false));
    }
    for (var i = 0; i < part; i++) {
        this.segments.push(new Segment(this.segments[this.segments.length - 1], 0, MAX_HILL * (-Math.cos((2 * i / part - 1) * Math.PI) - 1), this.segments.length, false));
    }
}

Road.prototype.addStraights = function (length) {
    for (var i = 0; i < length; i++) {
        this.segments.push(new Segment(this.segments[this.segments.length - 1], 0, 0, this.segments.length, false));
    }
}

Road.prototype.addJunctions = function (length) {
    this.trackCount++;
    var lastSegment = this.segments[this.segments.length - 1];
    var initial = {
        numLanes: junctNumLanes,
        leftJunction: Road.prepareInitial(new Vector3(lastSegment.highCenter.x - (lastSegment.asphalt.width / 4 - sideLineWidth / 2 + lineWidth / 4), lastSegment.highCenter.y, lastSegment.highCenter.z), lastSegment.curve, lastSegment.hill, junctNumLanes),
        rightJunction: Road.prepareInitial(new Vector3(lastSegment.highCenter.x + (lastSegment.asphalt.width / 4 - sideLineWidth / 2 + lineWidth / 4), lastSegment.highCenter.y, lastSegment.highCenter.z), lastSegment.curve, lastSegment.hill, junctNumLanes)
    };
    this.segments.push(new Junction(initial, 0, 0, this.segments.length, true));
    var part = (length - 1) / 3;
    for (var i = 0; i < part; i++) {
        this.segments.push(new Junction(this.segments[this.segments.length - 1], MAX_CURVE * (i / part), 0, this.segments.length, false));
    }
    for (var i = 0; i < part; i++) {
        this.segments.push(new Junction(this.segments[this.segments.length - 1], MAX_CURVE, 0, this.segments.length, false));
    }
    for (var i = 0; i < part; i++) {
        this.segments.push(new Junction(this.segments[this.segments.length - 1], MAX_CURVE * (1 - i / part), 0, this.segments.length, false));
    }
    for (var i = 0; i < Outrun.renderSize; i++) {
        this.segments.push(new Junction(this.segments[this.segments.length - 1], 0, 0, this.segments.length, false));
    }
}

Road.prototype.findIndex = function (position) {
    return Math.floor(position / segmentDepth) % this.segments.length;
}

Road.prepareInitial = function (center, curve, hill, numLanes) {
    var asphaltWidth = laneWidth * numLanes + lineWidth * (numLanes - 1) + sideLineWidth * 2;
    var initial = {
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
    var leftSide = initial.leftSide;
    for (var i = 0; i < numLanes - 1; i++) {
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