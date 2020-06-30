function GameWorld() {
    this.road = new Road(new Vector3(0, 0, 0), 0, 0, trackNumLanes);
    this.route = 'coconut-beach';
    this.backParallax = 0;
    this.frontParallax = 0;
}

const backSpeed = 0.000001;
const frontSpeed = 0.000002;
const backWidth = 1536;
const frontWidth = 2048;
const backgroundHeight = 256;
const backgroundOffset = -130;

GameWorld.prototype.play = function () {
    Driver.play();
}

GameWorld.prototype.update = function () {
    var currentIndex = this.road.findIndex(Driver.camera.position.z);
    for (var i = currentIndex, size = Math.min(this.road.segments.length, currentIndex + Outrun.renderSize); i < size; i++) {
        this.road.segments[i].project();
    }
    var parallaxAmount = Driver.speed * Math.sign(Driver.curveDirection);
    this.backParallax -= backSpeed * parallaxAmount;
    this.frontParallax -= frontSpeed * parallaxAmount;
    if (Math.abs(this.backParallax) > 1) {
        this.backParallax = 0;
    }
    if (Math.abs(this.frontParallax) > 1) {
        this.frontParallax = 0;
    }
    Driver.project();
}

GameWorld.prototype.draw = function () {
    Canvas.fill(colors[this.route].skyColor);
    Canvas.drawStaticImage(sprites[this.route].back, backWidth * (this.backParallax - 1), backgroundOffset, backWidth, backgroundHeight);
    Canvas.drawStaticImage(sprites[this.route].back, backWidth * (this.backParallax), backgroundOffset, backWidth, backgroundHeight);
    Canvas.drawStaticImage(sprites[this.route].back, backWidth * (this.backParallax + 1), backgroundOffset, backWidth, backgroundHeight);
    Canvas.drawStaticImage(sprites[this.route].front, frontWidth * (this.frontParallax - 1), backgroundOffset, frontWidth, backgroundHeight);
    Canvas.drawStaticImage(sprites[this.route].front, frontWidth * (this.frontParallax), backgroundOffset, frontWidth, backgroundHeight);
    Canvas.drawStaticImage(sprites[this.route].front, frontWidth * (this.frontParallax + 1), backgroundOffset, frontWidth, backgroundHeight);
    var currentIndex = this.road.findIndex(Driver.camera.position.z);
    var maxRendered = Math.min(this.road.segments.length, currentIndex + Outrun.renderSize) - 1;
    for (var i = maxRendered; i >= currentIndex; i--) {
        var segment = this.road.segments[i];
        var color = segment.isDark ? colors[this.route].darkOffroadColor : colors[this.route].lightOffroadColor;
        if (segment instanceof Segment) {
            Canvas.drawShape(segment.offroad.upLeft, segment.offroad.upRight, segment.offroad.downRight, segment.offroad.downLeft, color);
        } else {
            var subSegment = segment.leftJunction;
            Canvas.drawShape(subSegment.offroad.upLeft, subSegment.offroad.upRight, subSegment.offroad.downRight, subSegment.offroad.downLeft, color);
            subSegment = segment.rightJunction;
            Canvas.drawShape(subSegment.offroad.upLeft, subSegment.offroad.upRight, subSegment.offroad.downRight, subSegment.offroad.downLeft, color);
        }
    }
    for (var i = maxRendered; i >= currentIndex; i--) {
        var segment = this.road.segments[i];
        var asphaltColor = segment.isDark ? colors[this.route].darkAsphaltColor : colors[this.route].lightAsphaltColor;
        var sideColor = segment.isDark ? colors[this.route].darkSideColor : colors[this.route].lightSideColor;
        var lineColor = segment.isDark ? colors[this.route].darkLineColor : colors[this.route].lightLineColor;
        if (segment instanceof Segment) {
            Canvas.drawShape(segment.asphalt.upLeft, segment.asphalt.upRight, segment.asphalt.downRight, segment.asphalt.downLeft, asphaltColor);
            Canvas.drawShape(segment.leftSide.upLeft, segment.leftSide.upRight, segment.leftSide.downRight, segment.leftSide.downLeft, sideColor);
            Canvas.drawShape(segment.rightSide.upLeft, segment.rightSide.upRight, segment.rightSide.downRight, segment.rightSide.downLeft, sideColor);
            for (var j = 0; j < segment.numLanes - 1; j++) {
                Canvas.drawShape(segment.lines[j].upLeft, segment.lines[j].upRight, segment.lines[j].downRight, segment.lines[j].downLeft, lineColor);
            }
            for (var j = 0; j < segment.objects.length; j++) {
                var object = segment.objects[j];
                Canvas.drawImage(sprites[this.route][object.fileName], object.center, object.relWidth, object.relHeight);
            }
        } else {
            var subSegment = segment.leftJunction;
            Canvas.drawShape(subSegment.asphalt.upLeft, subSegment.asphalt.upRight, subSegment.asphalt.downRight, subSegment.asphalt.downLeft, asphaltColor);
            Canvas.drawShape(subSegment.leftSide.upLeft, subSegment.leftSide.upRight, subSegment.leftSide.downRight, subSegment.leftSide.downLeft, sideColor);
            Canvas.drawShape(subSegment.rightSide.upLeft, subSegment.rightSide.upRight, subSegment.rightSide.downRight, subSegment.rightSide.downLeft, sideColor);
            for (var j = 0; j < subSegment.numLanes - 1; j++) {
                Canvas.drawShape(subSegment.lines[j].upLeft, subSegment.lines[j].upRight, subSegment.lines[j].downRight, subSegment.lines[j].downLeft, lineColor);
            }
            for (var j = 0; j < subSegment.objects.length; j++) {
                var object = subSegment.objects[j];
                Canvas.drawImage(sprites[this.route][object.fileName], object.center, object.relWidth, object.relHeight);
            }
            subSegment = segment.rightJunction;
            Canvas.drawShape(subSegment.asphalt.upLeft, subSegment.asphalt.upRight, subSegment.asphalt.downRight, subSegment.asphalt.downLeft, asphaltColor);
            Canvas.drawShape(subSegment.leftSide.upLeft, subSegment.leftSide.upRight, subSegment.leftSide.downRight, subSegment.leftSide.downLeft, sideColor);
            Canvas.drawShape(subSegment.rightSide.upLeft, subSegment.rightSide.upRight, subSegment.rightSide.downRight, subSegment.rightSide.downLeft, sideColor);
            for (var j = 0; j < subSegment.numLanes - 1; j++) {
                Canvas.drawShape(subSegment.lines[j].upLeft, subSegment.lines[j].upRight, subSegment.lines[j].downRight, subSegment.lines[j].downLeft, lineColor);
            }
            for (var j = 0; j < subSegment.objects.length; j++) {
                var object = subSegment.objects[j];
                Canvas.drawImage(sprites[this.route][object.fileName], object.center, object.relWidth, object.relHeight);
            }
        }
    }
    Canvas.drawImage(sprites[Driver.car.fileName], Driver.car.center, Driver.car.width, Driver.car.height);

    if (this.road.segments.length - currentIndex < Outrun.renderSize) {
        this.road.addSegments(true);
    }
}

let Driver = new Player();