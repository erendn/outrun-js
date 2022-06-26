/**
 * This class represents a ground tile in the game.
 */
class Tile {

    constructor(prevTile, highCenter) {
        this.lowCenter = prevTile.highCenter;
        this.highCenter = highCenter;
        this.space = prevTile.space;
        this.width = prevTile.width;
        this.downLeft = prevTile.upLeft;
        this.downRight = prevTile.upRight;
        this.upLeft = new Vector3();
        this.upRight = new Vector3();
    }

    /**
     * This function is called once at each game cycle by the mainLoop()
     * function in the Game class.
     */
    project(measure2) {
        var relSpace = Vector3.calculate(this.space, Driver.camera.gap, measure2);
        var relWidth = Vector3.calculate(this.width, Driver.camera.gap, measure2);
        this.upLeft.xScreen = this.highCenter.xScreen + relSpace - relWidth / 2;
        this.upLeft.yScreen = this.highCenter.yScreen;
        this.upRight.xScreen = this.highCenter.xScreen + relSpace + relWidth / 2;
        this.upRight.yScreen = this.highCenter.yScreen;
    }

    /**
     * Project the tile with given relative space and relative width values.
     */
    calculate(relSpace, relWidth) {
        this.upLeft.xScreen = this.highCenter.xScreen + relSpace - relWidth / 2;
        this.upLeft.yScreen = this.highCenter.yScreen;
        this.upRight.xScreen = this.highCenter.xScreen + relSpace + relWidth / 2;
        this.upRight.yScreen = this.highCenter.yScreen;
    }

}