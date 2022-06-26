/**
 * This is the game class that executes the main function of the game.
 */
class Game {

    constructor() {
        this.scene = MENU_SCENE; // Current scene of the game
        this.renderSize = 300; // Render distance
        this.playable = false; // If the game is playable
        this.startDelay = 0; // Delay when starting the game
    }

    /**
     * Initialize the game by taking the current time, loading all assets, and creating the event listener.
     */
    init() {
        time = new Date().getTime();
        loadAssets();
        this.eventListener = new EventListener();
    }

    /**
     * Create a new game.
     */
    newGame() {
        this.gameWorld = new GameWorld();
    }

    /**
     * Start the game.
     */
    start() {
        Outrun.init();
        Outrun.mainLoop();
    }

    /**
     * This is the main loop function of the game. Once executed, it calls itself continuously.
     */
    mainLoop() {
        // Take the millisecond difference from the last time the game is updated
        currentTime = new Date().getTime();
        var milliseconds = currentTime - time;
        // Update if the millisecond difference is above the FPS limit
        if (milliseconds >= 1000 / FPS) {
            time = currentTime;
            // If all assets are not yet loaded, draw the loading screen
            if (loading < maxLoading) {
                Outrun.drawLoading();
            } else {
                // Update the radio
                Radio.update();
                // Draw the current scene
                if (Outrun.scene == MENU_SCENE | Outrun.scene == RADIO_SCENE) {
                    Radio.draw();
                } else if (Outrun.scene == IN_GAME_SCENE) {
                    if (!Outrun.playable) {
                        Outrun.startDelay = (Outrun.startDelay + 1) % FPS;
                        if (!Outrun.startDelay)
                            Outrun.gameWorld.road.nextLight();
                    }
                    Outrun.gameWorld.play();
                    Outrun.gameWorld.update();
                    Outrun.gameWorld.draw();
                }
            }
            Canvas.fix();
        }

        requestAnimationFrame(Outrun.mainLoop);
    }

    /**
     * Draw the loading screen.
     */
    drawLoading() {
        Canvas.fill("#008BFF");
        Canvas.canvasContext.fillStyle = "#000000";
        Canvas.canvasContext.fillRect(99, 126, 121, 12);
        Canvas.canvasContext.fillStyle = "#F7F700";
        Canvas.canvasContext.fillRect(99, 126, 121 * (loading / maxLoading), 12);
        Canvas.drawStaticImage(sprites["loading-box"], 98, 125, 124, 15);
        Canvas.drawStaticImage(sprites["loading-text"], 106, 84, 109, 28);
    }

}

var controlCount = 0;

const MENU_SCENE = "menu";
const RADIO_SCENE = "radio";
const IN_GAME_SCENE = "drive";

const FPS = 60; // Frames per second

var time = null;
var currentTime = null;

// TODO: Add the singleton design pattern
let Outrun = new Game(); // Singleton instance of Game