function Game() {
    this.scene = MENU_SCENE;
    this.renderSize = 300;
}

var controlCount = 0;

const MENU_SCENE = 'menu';
const RADIO_SCENE = 'radio';
const IN_GAME_SCENE = 'drive';

const FPS = 60;

var time = null;
var currentTime = null;

Game.prototype.init = function () {
    time = new Date().getTime();
    loadAssets();
    this.eventListener = new EventListener();
}

Game.prototype.newGame = function () {
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
        Radio.update();
        if (Outrun.scene == MENU_SCENE | Outrun.scene == RADIO_SCENE) {
            Radio.draw();
        } else if (Outrun.scene == IN_GAME_SCENE) {
            Outrun.gameWorld.play();
            Outrun.gameWorld.update();
            Outrun.gameWorld.draw();
        }
        Canvas.fix();
    }

    requestAnimationFrame(Outrun.mainLoop);
}

let Outrun = new Game();
