function GameWorld() {
    this.road = new Road(new Vector3(0, 0, 0), 0, 0, 5);
    this.objects = [];
    this.cloudParallax = 0;
    this.mountainParallax = 0;
    this.forestParallax = 0;

}

let cloudSpeed = 0.000001;
let mountainSpeed = 0.000002;
let forestSpeed = 0.000003;

GameWorld.prototype.play = function () {
    Driver.play();
}

GameWorld.prototype.update = function () {
    var currentIndex = this.road.findIndex(Driver.camera.position.z);
    Driver.curve = this.road.segments[currentIndex].curve;
    Driver.hill = this.road.segments[currentIndex].hill;
    for (var i = currentIndex, size = Math.min(this.road.segments.length, currentIndex + Outrun.renderSize); i < size; i++) {
        this.road.segments[i].project();
    }
    if (currentIndex != 0) {
        var curveDirection = Math.sign(this.road.segments[currentIndex].curve - this.road.segments[currentIndex - 1].curve);
        this.cloudParallax -= cloudSpeed * Driver.speed * curveDirection;
        this.mountainParallax -= mountainSpeed * Driver.speed * curveDirection;
        this.forestParallax -= forestSpeed * Driver.speed * curveDirection;
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
        Canvas.drawShape(segment.offroad.upLeft, segment.offroad.upRight, segment.offroad.downRight, segment.offroad.downLeft, segment.offroad.color);
    }
    for (var i = maxRendered; i >= currentIndex; i--) {
        var segment = this.road.segments[i];
        Canvas.drawShape(segment.asphalt.upLeft, segment.asphalt.upRight, segment.asphalt.downRight, segment.asphalt.downLeft, segment.asphalt.color);
        Canvas.drawShape(segment.leftSide.upLeft, segment.leftSide.upRight, segment.leftSide.downRight, segment.leftSide.downLeft, segment.leftSide.color);
        Canvas.drawShape(segment.rightSide.upLeft, segment.rightSide.upRight, segment.rightSide.downRight, segment.rightSide.downLeft, segment.rightSide.color);
        for (var j = 0; j < segment.numLanes - 1; j++) {
            Canvas.drawShape(segment.lines[j].upLeft, segment.lines[j].upRight, segment.lines[j].downRight, segment.lines[j].downLeft, segment.lines[j].color);
        }
        var object = segment.rightObject;
        if (object != undefined)
            Canvas.drawImage(sprites[object.fileName], object.center, object.relWidth, object.relHeight);
    }
    Canvas.drawImage(sprites[Driver.car.fileName], Driver.car.center, Driver.car.relWidth, Driver.car.relHeight);

    Canvas.pixelize(4);
    if (this.road.segments.length - currentIndex < Outrun.renderSize) {
        this.road.addSegments(true);
    }
}

let Driver = new Player();