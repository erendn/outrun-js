function Road(center, curve, hill, numLanes) {
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
                space: leftSide.space + sideLineWidth / 2 + laneWidth + (laneWidth + lineWidth) * i + lineWidth / 2,
                width: lineWidth
            }
        );
    }
    this.segments = [new Segment(initial, curve, hill)];
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

let skyColor = '#0094FF';
let darkAsphaltColor = '#949494';
let lightAsphaltColor = '#9C9C9C';
let whiteColor = '#F7F7F7';
let redColor = '#FF0000';
let darkOffroadColor = '#076348';
let lightOffroadColor = '#1d963f';

let MAX_CURVE = 0.7;
let MAX_HILL = 10;

Road.prototype.addSegments = function (canCurve) {
    var curved = canCurve & Math.random() < 0.3;
    if (curved) {
        var curveLength = Math.random() < 0.5 ? 100 : 200;
        if (Math.random() < 0.7) { // CURVE
            var direction = Math.random() < 0.5 ? -1 : 1;
            for (var j = 0; j < curveLength; j++) {
                this.segments.push(new Segment(this.segments[this.segments.length - 1], MAX_CURVE * (j / curveLength) * direction, 0, this.segments.length));
            }
            for (var j = 0; j < curveLength; j++) {
                this.segments.push(new Segment(this.segments[this.segments.length - 1], MAX_CURVE * direction, 0, this.segments.length));
            }
            for (var j = 0; j < curveLength; j++) {
                this.segments.push(new Segment(this.segments[this.segments.length - 1], MAX_CURVE * (1 - j / curveLength) * direction, 0, this.segments.length));
            }
        } else { // HILL
            for (var j = 0; j < curveLength; j++) {
                this.segments.push(new Segment(this.segments[this.segments.length - 1], 0, MAX_HILL * (Math.cos((2 * j / curveLength - 1) * Math.PI) + 1), this.segments.length));
            }
            for (var i = 0; i < curveLength; i++) {
                this.segments.push(new Segment(this.segments[this.segments.length - 1], 0, 0, this.segments.length));
            }
            for (var j = 0; j < curveLength; j++) {
                this.segments.push(new Segment(this.segments[this.segments.length - 1], 0, MAX_HILL * (-Math.cos((2 * j / curveLength - 1) * Math.PI) - 1), this.segments.length));
            }
        }
    } else { // STRAIGHT
        for (var i = 0; i < Outrun.renderSize; i++) {
            this.segments.push(new Segment(this.segments[this.segments.length - 1], 0, 0, this.segments.length));
        }
    }
}

Road.prototype.findIndex = function (position) {
    return Math.floor(position / segmentDepth) % this.segments.length;
}