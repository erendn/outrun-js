function Segment(prevSegment, curve, hill, index, isInitial, isTunnel) {
    this.numLanes = prevSegment.numLanes;
    this.isInitial = isInitial;
    this.curve = prevSegment.curve + curve;
    this.hill = prevSegment.hill + hill;
    this.lowCenter = prevSegment.highCenter;
    this.highCenter = new Vector3(this.lowCenter.x + curve, this.lowCenter.y + hill, this.lowCenter.z + segmentDepth);
    this.offroad = new Tile(prevSegment.offroad, this.highCenter, index % (2 * invisSegment) < invisSegment ? darkOffroadColor : lightOffroadColor);
    this.asphalt = new Tile(prevSegment.asphalt, this.highCenter, index % (2 * invisSegment) < invisSegment ? darkAsphaltColor : lightAsphaltColor);
    this.leftSide = new Tile(prevSegment.leftSide, this.highCenter, index % (2 * invisSegment) < invisSegment ? redColor : whiteColor);
    this.rightSide = new Tile(prevSegment.rightSide, this.highCenter, index % (2 * invisSegment) < invisSegment ? redColor : whiteColor);
    this.lines = [];
    for (var i = 0; i < this.numLanes - 1; i++) {
        this.lines.push(new Tile(prevSegment.lines[i], this.highCenter, index % (2 * invisSegment) < invisSegment ? darkAsphaltColor : whiteColor));
    }
    if (!isTunnel & !(index % objectDistance)) {
        //this.rightObject = new WorldObject(new Vector3(this.highCenter.x, this.highCenter.y, this.highCenter.z), this.asphalt.width / 2 + 600, 1741, 4000, 'tree');
    }
    if(isTunnel & !(index % tunnelDistance))
        this.rightObject = new WorldObject(new Vector3(this.highCenter.x, this.highCenter.y, this.highCenter.z), 0, 5600, 2000, 'tunnel');
}

const invisSegment = 6;
const sideLineWidth = 300;
const lineWidth = 150;
const laneWidth = 1200;
const offroadWidth = 70000;
const segmentDepth = 200;
const objectDistance = 10;
const tunnelDistance = 12;

Segment.prototype.project = function () {
    if (this.isInitial & this.lowCenter.z > Driver.camera.position.z) {
        this.offroad.downLeft.project();
        this.offroad.downRight.project();
        this.asphalt.downLeft.project();
        this.asphalt.downRight.project();
        this.leftSide.downLeft.project();
        this.leftSide.downRight.project();
        this.rightSide.downLeft.project();
        this.rightSide.downRight.project();
        for (var i = 0; i < this.numLanes - 1; i++) {
            this.lines[i].downLeft.project();
            this.lines[i].downRight.project();
        }
    }
    this.highCenter.x = this.lowCenter.x + (this.curve - Driver.curve);
    this.highCenter.project();
    var measure2 = this.highCenter.z - Driver.camera.position.z;
    this.offroad.project(measure2);
    this.asphalt.project(measure2);
    this.leftSide.project(measure2);
    this.rightSide.project(measure2);
    for (var i = 0, size = this.numLanes / 2; i < size; i++) {
        var relSpace = Vector3.calculate(this.lines[i].space, Driver.camera.gap, measure2);
        var relWidth = Vector3.calculate(this.lines[i].width, Driver.camera.gap, measure2);
        this.lines[i].calculate(relSpace, relWidth);
        this.lines[this.numLanes - 2 - i].calculate(-relSpace, relWidth);
    }
    if (this.numLanes % 2 == 0) {
        this.lines[this.numLanes / 2 + 1].project(measure2);
    }
    if (this.rightObject != undefined) {
        this.rightObject.center.x = this.highCenter.x + this.rightObject.offset;
        this.rightObject.project(measure2);
    }
}