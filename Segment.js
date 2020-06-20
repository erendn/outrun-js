function Segment(prevSegment, curve, hill, index) {
    this.curve = prevSegment.curve + curve;
    this.hill = prevSegment.hill + hill;
    this.lowCenter = prevSegment.highCenter;
    this.highCenter = new Vector3(this.lowCenter.x + curve, this.lowCenter.y + hill, this.lowCenter.z + segmentDepth);
    this.offroad = new Tile(prevSegment.offroad, this.highCenter, 0, offroadWidth, index % (2 * invisSegment) < invisSegment ? darkOffroadColor : lightOffroadColor);
    this.asphalt = new Tile(prevSegment.asphalt, this.highCenter, 0, asphaltWidth, index % (2 * invisSegment) < invisSegment ? darkAsphaltColor : lightAsphaltColor);
    this.line1 = new Tile(prevSegment.line1, this.highCenter, -asphaltWidth * 3 / 10, lineWidth, index % (2 * invisSegment) < invisSegment ? darkAsphaltColor : whiteColor);
    this.line2 = new Tile(prevSegment.line2, this.highCenter, -asphaltWidth * 1 / 10, lineWidth, index % (2 * invisSegment) < invisSegment ? darkAsphaltColor : whiteColor);
    this.line3 = new Tile(prevSegment.line3, this.highCenter, asphaltWidth * 1 / 10, lineWidth, index % (2 * invisSegment) < invisSegment ? darkAsphaltColor : whiteColor);
    this.line4 = new Tile(prevSegment.line4, this.highCenter, asphaltWidth * 3 / 10, lineWidth, index % (2 * invisSegment) < invisSegment ? darkAsphaltColor : whiteColor);
    this.leftSide = new Tile(prevSegment.leftSide, this.highCenter, -asphaltWidth / 2, sideLineWidth, index % (2 * invisSegment) < invisSegment ? redColor : whiteColor);
    this.rightSide = new Tile(prevSegment.rightSide, this.highCenter, asphaltWidth / 2, sideLineWidth, index % (2 * invisSegment) < invisSegment ? redColor : whiteColor);
}

let invisSegment = 8;
let sideLineWidth = 300;
let lineWidth = 150;
let asphaltWidth = 9000 + lineWidth * 2;
let laneWidth = (asphaltWidth - lineWidth * 2) / 5;
let offroadWidth = 50000;
let segmentDepth = 100;

Segment.prototype.project = function () {
    this.highCenter.x = this.lowCenter.x + (this.curve - Driver.curve);
    this.highCenter.project();
    var measure2 = this.lowCenter.z - Driver.camera.position.z;
    this.offroad.project(measure2);
    this.asphalt.project(measure2);
    var relSpace = Vector3.calculate(this.line1.space, Driver.camera.gap, measure2);
    var relWidth = Vector3.calculate(this.line1.width, Driver.camera.gap, measure2);
    this.line1.calculate(relSpace, relWidth);
    this.line4.calculate(-relSpace, relWidth);
    relSpace = Vector3.calculate(this.line2.space, Driver.camera.gap, measure2);
    relWidth = Vector3.calculate(this.line2.width, Driver.camera.gap, measure2);
    this.line2.calculate(relSpace, relWidth);
    this.line3.calculate(-relSpace, relWidth);
    this.leftSide.project(measure2);
    this.rightSide.project(measure2);
}