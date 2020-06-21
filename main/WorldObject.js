function WorldObject(center, width, height, fileName) {
    this.center = center;
    this.width = width;
    this.height = height;
    this.fileName = fileName;
    this.relHeight = 0;
    this.relWidth = 0;
}

WorldObject.prototype.project = function (measure2) {
    this.center.project();
    this.relWidth = Vector3.calculate(this.width, Driver.camera.gap, measure2);
    this.relHeight = Vector3.calculate(this.height, Driver.camera.gap, measure2);
}