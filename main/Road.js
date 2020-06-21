function Road() {
    var origin = new Vector3(0, 0, 0);
    this.segments = [new Segment
        (
            {
                curve: 0,
                hill: 0,
                highCenter: origin,
                offroad: {
                    upLeft: new Vector3(-offroadWidth, 0, 0),
                    upRight: new Vector3(offroadWidth, 0, 0),
                    highCenter: origin
                },
                asphalt: {
                    upLeft: new Vector3(-asphaltWidth, 0, 0),
                    upRight: new Vector3(asphaltWidth, 0, 0),
                    highCenter: origin
                },
                line1: {
                    upLeft: new Vector3(-asphaltWidth, 0, 0),
                    upRight: new Vector3(asphaltWidth, 0, 0),
                    highCenter: origin
                },
                line2: {
                    upLeft: new Vector3(-asphaltWidth, 0, 0),
                    upRight: new Vector3(asphaltWidth, 0, 0),
                    highCenter: origin
                },
                line3: {
                    upLeft: new Vector3(-asphaltWidth, 0, 0),
                    upRight: new Vector3(asphaltWidth, 0, 0),
                    highCenter: origin
                },
                line4: {
                    upLeft: new Vector3(-asphaltWidth, 0, 0),
                    upRight: new Vector3(asphaltWidth, 0, 0),
                    highCenter: origin
                },
                leftSide: {
                    upLeft: new Vector3(-asphaltWidth - lineWidth, 0, 0),
                    upRight: new Vector3(-asphaltWidth, 0, 0),
                    highCenter: origin
                },
                rightSide: {
                    upLeft: new Vector3(asphaltWidth, 0, 0),
                    upRight: new Vector3(asphaltWidth + lineWidth, 0, 0),
                    highCenter: origin
                }
            },
            0,
            0)];
    this.addSegments(false);
    this.segments[0].offroad.downLeft.project();
    this.segments[0].offroad.downRight.project();
    this.segments[0].asphalt.downLeft.project();
    this.segments[0].asphalt.downRight.project();
    this.segments[0].line1.downLeft.project();
    this.segments[0].line1.downRight.project();
    this.segments[0].line2.downLeft.project();
    this.segments[0].line2.downRight.project();
    this.segments[0].line3.downLeft.project();
    this.segments[0].line3.downRight.project();
    this.segments[0].line4.downLeft.project();
    this.segments[0].line4.downRight.project();
    this.segments[0].leftSide.downLeft.project();
    this.segments[0].leftSide.downRight.project();
    this.segments[0].rightSide.downLeft.project();
    this.segments[0].rightSide.downRight.project();
}

let skyColor = '#0094FF';
let darkAsphaltColor = '#949494';
let lightAsphaltColor = '#9C9C9C';
let whiteColor = '#F7F7F7';
let redColor = '#FF0000';
let darkOffroadColor = '#076348';
let lightOffroadColor = '#1d963f';

let MAX_CURVE = 0.3;
let MAX_HILL = 10;

Road.prototype.addSegments = function (canCurve) {
    var curved = canCurve & Math.random() < 0.3;
    if (curved) {
        var curveLength = Math.random() < 0.5 ? 200 : 400;
        if (Math.random() < 0.5) { // CURVE
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