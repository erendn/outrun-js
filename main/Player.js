function Player() {
    this.camera = new Camera(window.innerWidth, window.innerHeight, 500, 90);
    this.car = new WorldObject(new Vector3(0, 0, carDistance), 800, 450, 'straight');
    this.lastSegment = null;
    this.curve = 0;
    this.hill = 0;
    this.curveDirection = 0;
    this.hillDirection = 0;
    this.speed = 0;
    this.accelerate = false;
    this.decelerate = false;
    this.steerLeft = false;
    this.steerRight = false;
}

const maxSpeed = 600;

const carDistance = 2200;

const curveSense = 0.1;

Player.prototype.play = function () {
    if (this.accelerate) {
        this.speed += 2;
    } else if (this.decelerate) {
        this.speed -= 8;
    } else {
        this.speed -= 1;
    }
    this.speed = this.speed < 0 ? this.speed = 0 : this.speed > maxSpeed ? maxSpeed : this.speed;

    var carIndex = Outrun.gameWorld.road.findIndex(this.car.center.z);
    var segment = Outrun.gameWorld.road.segments[carIndex];
    if (segment instanceof Segment) {
        this.lastSegment = segment;
        this.curve = segment.curve;
        this.hill = segment.hill;
        if (Outrun.gameWorld.road.segments[carIndex - 1] instanceof Segment) {
            this.curveDirection = this.curve - Outrun.gameWorld.road.segments[carIndex - 1].curve;
            this.hillDirection = this.hill - Outrun.gameWorld.road.segments[carIndex - 1].hill;
        } else {
            this.curveDirection = 0;
            this.hillDirection = 0;
        }
    } else {
        if (Outrun.gameWorld.road.trackCount > Outrun.gameWorld.road.chosenPath.length) {
            Outrun.gameWorld.road.chosenPath.push(this.car.center.x < this.lastSegment.highCenter.x);
        }
        if (Outrun.gameWorld.road.chosenPath[Outrun.gameWorld.road.chosenPath.length - 1]) {
            this.curve = segment.leftJunction.curve;
            this.hill = segment.leftJunction.hill;
            if (Outrun.gameWorld.road.segments[carIndex - 1] instanceof Junction) {
                this.curveDirection = this.curve - Outrun.gameWorld.road.segments[carIndex - 1].leftJunction.curve;
                this.hillDirection = this.hill - Outrun.gameWorld.road.segments[carIndex - 1].leftJunction.hill;
            } else {
                this.curveDirection = 0;
                this.hillDirection = 0;
            }
        } else {
            this.curve = segment.rightJunction.curve;
            this.hill = segment.rightJunction.hill;
            if (Outrun.gameWorld.road.segments[carIndex - 1] instanceof Junction) {
                this.curveDirection = this.curve - Outrun.gameWorld.road.segments[carIndex - 1].rightJunction.curve;
                this.hillDirection = this.hill - Outrun.gameWorld.road.segments[carIndex - 1].rightJunction.hill;
            } else {
                this.curveDirection = 0;
                this.hillDirection = 0;
            }
        }
    }

    zMove = this.speed * (this.steerLeft | this.steerRight ? 0.83 : 1);
    xMove = this.speed * ((this.steerLeft ? -0.17 : this.steerRight ? 0.17 : 0) - this.curveDirection / 5);

    this.camera.position.z += zMove;
    this.camera.position.x += xMove;
    this.camera.position.y = this.hill + this.camera.altitude + this.camera.height / 2;
}

Player.prototype.project = function () {
    this.car.center.x = this.camera.position.x;
    this.car.center.z = this.camera.position.z + carDistance;
    this.car.center.y = this.hill;
    this.car.project(this.car.center.z - this.camera.position.z);

    this.car.fileName = this.hillDirection > 12 ? 'hill-' : '';
    if (this.curveDirection < -curveSense) {
        if (this.steerLeft)
            this.car.fileName += 'left-hard';
        else if (this.steerRight)
            this.car.fileName += 'straight';
        else
            this.car.fileName += 'left';
    } else if (this.curveDirection > curveSense) {
        if (this.steerLeft)
            this.car.fileName += 'straight';
        else if (this.steerRight)
            this.car.fileName += 'right-hard';
        else
            this.car.fileName += 'right';
    } else {
        if (this.steerLeft)
            this.car.fileName += 'left';
        else if (this.steerRight)
            this.car.fileName += 'right';
        else
            this.car.fileName += 'straight';

    }
}