function Canvas2D() {
    this.canvas = document.getElementById('screen');
    this.canvasContext = this.canvas.getContext('2d');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
}

Canvas2D.prototype.clear = function () {
    this.canvasContext.clearRect(0, 0, this.width, this.height);
}

Canvas2D.prototype.fill = function (color) {
    this.canvasContext.fillStyle = color;
    this.canvasContext.fillRect(0, 0, this.width, this.height);
}

Canvas2D.prototype.drawImage = function (image, center, width, height) {
    this.canvasContext.drawImage(image, center.xScreen - width / 2, center.yScreen - height, width, height);
}

Canvas2D.prototype.drawStaticImage = function(image, x, y, width, height){
    this.canvasContext.drawImage(image, x, y, width, height);
}

Canvas2D.prototype.drawShape = function (point1, point2, point3, point4, color) {
    this.canvasContext.beginPath();
    this.canvasContext.moveTo(point1.xScreen, point1.yScreen);
    this.canvasContext.lineTo(point2.xScreen, point2.yScreen);
    this.canvasContext.lineTo(point3.xScreen, point3.yScreen);
    this.canvasContext.lineTo(point4.xScreen, point4.yScreen);
    this.canvasContext.fillStyle = color;
    this.canvasContext.fill();
    this.canvasContext.strokeStyle = color;
    this.canvasContext.stroke();
}

Canvas2D.prototype.pixelize = function (pixelSize) {
    this.canvasContext.drawImage(this.canvas, 0, 0, this.width, this.height, 0, 0, this.width / pixelSize, this.height / pixelSize);
    this.canvasContext.mozImageSmoothingEnabled = false;
    this.canvasContext.imageSmoothingEnabled = false;
    this.canvasContext.drawImage(this.canvas, 0, 0, this.width / pixelSize, this.height / pixelSize, 0, 0, this.width, this.height);
}

let Canvas = new Canvas2D();