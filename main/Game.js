function Game() {
    this.scene = IN_GAME_SCENE;
    this.renderSize = 200;
}

var controlCount = 0;

let MENU_SCENE = 'menu';
let IN_GAME_SCENE = 'drive';

let FPS = 60;

var time = null;
var currentTime = null;

Game.prototype.init = function () {
    time = new Date().getTime();
    loadAssets();
    this.eventListener = new EventListener();
    this.gameWorld = new GameWorld();
}

Game.prototype.start = function () {
    Outrun.init();
    Outrun.mainLoop();
}

Game.prototype.mainLoop = function () {
    currentTime = new Date().getTime();
    var milliseconds = currentTime - time;
    if (milliseconds >= 1000 / FPS) {
        time = currentTime;
        Outrun.gameWorld.play();
        Outrun.gameWorld.update();
        Outrun.gameWorld.draw();
    }

    requestAnimationFrame(Outrun.mainLoop);
}

let Outrun = new Game();
