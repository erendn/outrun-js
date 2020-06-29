function GameWorld() {
    this.road = new Road(new Vector3(0, 0, 0), 0, 0, trackNumLanes);
    this.cloudParallax = 0;
    this.mountainParallax = 0;
    this.forestParallax = 0;
}

const cloudSpeed = 0.000001;
const mountainSpeed = 0.000002;
const forestSpeed = 0.000003;

GameWorld.prototype.play = function () {
    Driver.play();
}

GameWorld.prototype.update = function () {
    var currentIndex = this.road.findIndex(Driver.camera.position.z);
    for (var i = currentIndex, size = Math.min(this.road.segments.length, currentIndex + Outrun.renderSize); i < size; i++) {
        this.road.segments[i].project();
    }
    if (currentIndex != 0) {
        this.cloudParallax -= cloudSpeed * Driver.speed * Math.sign(Driver.curveDirection);
        this.mountainParallax -= mountainSpeed * Driver.speed * Math.sign(Driver.curveDirection);
        this.forestParallax -= forestSpeed * Driver.speed * Math.sign(Driver.curveDirection);
        if (Math.abs(this.cloudParallax) > 1) {
            this.cloudParallax = 0;
        }
        if (Math.abs(this.mountainParallax) > 1) {
            this.mountainParallax = 0;
        }
        if (Math.abs(this.forestParallax) > 1) {
            this.forestParallax = 0;
        }
    }
    Driver.project();
}

GameWorld.prototype.draw = function () {
    Canvas.clear();
    Canvas.drawStaticImage(sprites['sky'], 0, 0, Canvas.width, Canvas.height);
    Canvas.drawStaticImage(sprites['cloud'], Canvas.width * (this.cloudParallax - 1), 0, Canvas.width, Canvas.height);
    Canvas.drawStaticImage(sprites['cloud'], Canvas.width * this.cloudParallax, 0, Canvas.width, Canvas.height);
    Canvas.drawStaticImage(sprites['cloud'], Canvas.width * (this.cloudParallax + 1), 0, Canvas.width, Canvas.height);
    Canvas.drawStaticImage(sprites['mountain'], Canvas.width * (this.mountainParallax - 1), 0, Canvas.width, Canvas.height);
    Canvas.drawStaticImage(sprites['mountain'], Canvas.width * this.mountainParallax, 0, Canvas.width, Canvas.height);
    Canvas.drawStaticImage(sprites['mountain'], Canvas.width * (this.mountainParallax + 1), 0, Canvas.width, Canvas.height);
    Canvas.drawStaticImage(sprites['forest'], Canvas.width * (this.forestParallax - 1), 0, Canvas.width, Canvas.height);
    Canvas.drawStaticImage(sprites['forest'], Canvas.width * this.forestParallax, 0, Canvas.width, Canvas.height);
    Canvas.drawStaticImage(sprites['forest'], Canvas.width * (this.forestParallax + 1), 0, Canvas.width, Canvas.height);
    var currentIndex = this.road.findIndex(Driver.camera.position.z);
    var maxRendered = Math.min(this.road.segments.length, currentIndex + Outrun.renderSize) - 1;
    for (var i = maxRendered; i >= currentIndex; i--) {
        var segment = this.road.segments[i];
        if (segment instanceof Segment) {
            Canvas.drawShape(segment.offroad.upLeft, segment.offroad.upRight, segment.offroad.downRight, segment.offroad.downLeft, segment.offroad.color);
        } else {
            var subSegment = segment.leftJunction;
            Canvas.drawShape(subSegment.offroad.upLeft, subSegment.offroad.upRight, subSegment.offroad.downRight, subSegment.offroad.downLeft, subSegment.offroad.color);
            subSegment = segment.rightJunction;
            Canvas.drawShape(subSegment.offroad.upLeft, subSegment.offroad.upRight, subSegment.offroad.downRight, subSegment.offroad.downLeft, subSegment.offroad.color);
        }
    }
    for (var i = maxRendered; i >= currentIndex; i--) {
        var segment = this.road.segments[i];
        if (segment instanceof Segment) {
            Canvas.drawShape(segment.asphalt.upLeft, segment.asphalt.upRight, segment.asphalt.downRight, segment.asphalt.downLeft, segment.asphalt.color);
            Canvas.drawShape(segment.leftSide.upLeft, segment.leftSide.upRight, segment.leftSide.downRight, segment.leftSide.downLeft, segment.leftSide.color);
            Canvas.drawShape(segment.rightSide.upLeft, segment.rightSide.upRight, segment.rightSide.downRight, segment.rightSide.downLeft, segment.rightSide.color);
            for (var j = 0; j < segment.numLanes - 1; j++) {
                Canvas.drawShape(segment.lines[j].upLeft, segment.lines[j].upRight, segment.lines[j].downRight, segment.lines[j].downLeft, segment.lines[j].color);
            }
            var object = segment.rightObject;
            if (object != undefined)
                Canvas.drawImage(sprites[object.fileName], object.center, object.relWidth, object.relHeight);
        } else {
            var subSegment = segment.leftJunction;
            Canvas.drawShape(subSegment.asphalt.upLeft, subSegment.asphalt.upRight, subSegment.asphalt.downRight, subSegment.asphalt.downLeft, subSegment.asphalt.color);
            Canvas.drawShape(subSegment.leftSide.upLeft, subSegment.leftSide.upRight, subSegment.leftSide.downRight, subSegment.leftSide.downLeft, subSegment.leftSide.color);
            Canvas.drawShape(subSegment.rightSide.upLeft, subSegment.rightSide.upRight, subSegment.rightSide.downRight, subSegment.rightSide.downLeft, subSegment.rightSide.color);
            for (var j = 0; j < subSegment.numLanes - 1; j++) {
                Canvas.drawShape(subSegment.lines[j].upLeft, subSegment.lines[j].upRight, subSegment.lines[j].downRight, subSegment.lines[j].downLeft, subSegment.lines[j].color);
            }
            var object = subSegment.rightObject;
            if (object != undefined)
                Canvas.drawImage(sprites[object.fileName], object.center, object.relWidth, object.relHeight);
            var subSegment = segment.rightJunction;
            Canvas.drawShape(subSegment.asphalt.upLeft, subSegment.asphalt.upRight, subSegment.asphalt.downRight, subSegment.asphalt.downLeft, subSegment.asphalt.color);
            Canvas.drawShape(subSegment.leftSide.upLeft, subSegment.leftSide.upRight, subSegment.leftSide.downRight, subSegment.leftSide.downLeft, subSegment.leftSide.color);
            Canvas.drawShape(subSegment.rightSide.upLeft, subSegment.rightSide.upRight, subSegment.rightSide.downRight, subSegment.rightSide.downLeft, subSegment.rightSide.color);
            for (var j = 0; j < subSegment.numLanes - 1; j++) {
                Canvas.drawShape(subSegment.lines[j].upLeft, subSegment.lines[j].upRight, subSegment.lines[j].downRight, subSegment.lines[j].downLeft, subSegment.lines[j].color);
            }
            var object = subSegment.rightObject;
            if (object != undefined)
                Canvas.drawImage(sprites[object.fileName], object.center, object.relWidth, object.relHeight);
        }
    }
    Canvas.drawImage(sprites[Driver.car.fileName], Driver.car.center, Driver.car.relWidth, Driver.car.relHeight);

    if (this.road.segments.length - currentIndex < Outrun.renderSize) {
        this.road.addSegments(true);
    }
}

let Driver = new Player();