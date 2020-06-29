function MenuScreen() {
    this.delay = 0;
    this.background = 0;
    this.tree = 0;
}

const menuDelay = 6;

MenuScreen.prototype.draw = function () {
    this.delay = (this.delay + 1) % menuDelay;
    if (!this.delay) {
        /*
        this.background = (this.background + 1) % 6;
        this.tree = (this.tree + 1) % 3;
        */
       this.background = Math.floor(Math.random() * 6);
       this.tree = Math.floor(Math.random() * 3);
    }
    Canvas.fill('#008BFF');
    Canvas.drawStaticImage(sprites['logo-bg-' + this.background], 72, 68, 176, 88);
    Canvas.drawStaticImage(sprites['logo-road'], 81, 130, 95, 25);
    Canvas.drawStaticImage(sprites['logo-car'], 127, 116, 64, 39);
    Canvas.drawStaticImage(sprites['logo-tree-' + this.tree], 75, 80, 46, 57);
    Canvas.drawStaticImage(sprites['logo-text'], 109, 83, 135, 36);
}

let Menu = new MenuScreen();