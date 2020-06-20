function Player() {
    this.camera = new Camera(window.innerWidth, window.innerHeight, 300, 90);
    this.position = new Vector3(0, 0, 0);
    this.curve = 0;
    this.hill = 0;
    this.speed = 0;
    this.accelerate = false;
    this.decelerate = false;
    this.steerLeft = false;
    this.steerRight = false;
}

let maxSpeed = 600;

Player.prototype.play = function () {
    if (this.accelerate) {
        this.speed += 2;
    } else if (this.decelerate) {
        this.speed -= 8;
    } else {
        this.speed -= 1;
    }
    this.speed = this.speed < 0 ? this.speed = 0 : this.speed > maxSpeed ? maxSpeed : this.speed;

    zMove = this.speed * (this.steerLeft | this.steerRight ? 0.83 : 1);
    xMove = this.speed * (this.steerLeft ? -0.17 : this.steerRight ? 0.17 : 0);

    this.position.z += zMove;
    this.position.x += xMove;
    this.position.y = this.hill;

    this.camera.position.z = this.position.z;
    this.camera.position.x = this.position.x;
    this.camera.position.y = this.position.y + this.camera.altitude + this.camera.height / 2;
}