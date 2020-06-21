function Player() {
    this.camera = new Camera(window.innerWidth, window.innerHeight, 200, 90);
    this.car = new WorldObject(new Vector3(0, 0, carDistance), 700, 394, 'straight');
    this.curve = 0;
    this.hill = 0;
    this.speed = 0;
    this.accelerate = false;
    this.decelerate = false;
    this.steerLeft = false;
    this.steerRight = false;
}

let maxSpeed = 600;

let carDistance = 2000;

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
    var curve = Outrun.gameWorld.road.segments[carIndex].curve - Outrun.gameWorld.road.segments[carIndex - 1].curve;

    zMove = this.speed * (this.steerLeft | this.steerRight ? 0.83 : 1);
    xMove = this.speed * ((this.steerLeft ? -0.17 : this.steerRight ? 0.17 : 0) - curve / 2);

    this.camera.position.z += zMove;
    this.camera.position.x += xMove;
    this.camera.position.y = this.hill + this.camera.altitude + this.camera.height / 2;
}

Player.prototype.project = function () {
    this.car.center.x = this.camera.position.x;
    this.car.center.z = this.camera.position.z + carDistance;
    var carIndex = Outrun.gameWorld.road.findIndex(this.car.center.z);
    this.car.center.y = Outrun.gameWorld.road.segments[carIndex].hill;
    this.car.project(this.car.center.z - this.camera.position.z);
    var curveDirection = Outrun.gameWorld.road.segments[carIndex].curve - Outrun.gameWorld.road.segments[carIndex - 1].curve;
    var hillDirection = Outrun.gameWorld.road.segments[carIndex].hill - Outrun.gameWorld.road.segments[carIndex - 1].hill;
    this.car.fileName = hillDirection > 12 ? 'hill-' : '';
    if (curveDirection < 0) {
        if (this.steerLeft)
            this.car.fileName += 'left-hard';
        else if (this.steerRight)
            this.car.fileName += 'straight';
        else
            this.car.fileName += 'left';
    } else if (curveDirection > 0) {
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