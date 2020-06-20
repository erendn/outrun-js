function GameWorld() {
    this.road = new Road();
    this.objects = [];
}

GameWorld.prototype.play = function () {
    Driver.play();
}

GameWorld.prototype.update = function () {
    var currentIndex = this.road.findIndex(Driver.position.z);
    Driver.curve = this.road.segments[currentIndex].curve;
    Driver.hill = this.road.segments[currentIndex].hill;
    for (var i = currentIndex, size = Math.min(this.road.segments.length, currentIndex + Outrun.renderSize); i < size; i++) {
        this.road.segments[i].project();
    }
}

GameWorld.prototype.draw = function () {
    Canvas.fill(skyColor);
    var currentIndex = this.road.findIndex(Driver.position.z);
    var maxRendered = Math.min(this.road.segments.length, currentIndex + Outrun.renderSize) - 1;
    for (var i = maxRendered; i >= currentIndex; i--) {
        var segment = this.road.segments[i];
        Canvas.drawShape(segment.offroad.upLeft, segment.offroad.upRight, segment.offroad.downRight, segment.offroad.downLeft, segment.offroad.color);
    }
    for (var i = maxRendered; i >= currentIndex; i--) {
        var segment = this.road.segments[i];
        Canvas.drawShape(segment.asphalt.upLeft, segment.asphalt.upRight, segment.asphalt.downRight, segment.asphalt.downLeft, segment.asphalt.color);
        Canvas.drawShape(segment.line1.upLeft, segment.line1.upRight, segment.line1.downRight, segment.line1.downLeft, segment.line1.color);
        Canvas.drawShape(segment.line2.upLeft, segment.line2.upRight, segment.line2.downRight, segment.line2.downLeft, segment.line2.color);
        Canvas.drawShape(segment.line3.upLeft, segment.line3.upRight, segment.line3.downRight, segment.line3.downLeft, segment.line3.color);
        Canvas.drawShape(segment.line4.upLeft, segment.line4.upRight, segment.line4.downRight, segment.line4.downLeft, segment.line4.color);
        Canvas.drawShape(segment.leftSide.upLeft, segment.leftSide.upRight, segment.leftSide.downRight, segment.leftSide.downLeft, segment.leftSide.color);
        Canvas.drawShape(segment.rightSide.upLeft, segment.rightSide.upRight, segment.rightSide.downRight, segment.rightSide.downLeft, segment.rightSide.color);
        var object = segment.rightObject;
        if (object != undefined)
            Canvas.drawImage(object.filePath, object.center, object.relWidth, object.relHeight);
    }
    for (var i = maxRendered; i >= currentIndex; i--) {
    }
    //Canvas.drawImage("player/straight", {xScreen: 500, yScreen: 500}, {xScreen: 1000, yScreen: 832});

    //Canvas.pixelize(3);
    if (this.road.segments.length - currentIndex < Outrun.renderSize) {
        this.road.addSegments(true);
    }
}

let Driver = new Player();