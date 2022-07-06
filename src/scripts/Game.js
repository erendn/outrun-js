import AssetLoader from "./engine/core/AssetLoader.js";
import Radio from "./Radio.js";
import Canvas from "./engine/geometry/Canvas.js";
import EventListener from "./EventListener.js";
import { GameWorld } from "./GameWorld.js";

/**
 * This is the game class that executes the main function of the game.
 */
class Game {

    constructor() {
        this.scene = MENU_SCENE; // Current scene of the game
        this.renderSize = 300; // Render distance
        // FIXME: The game shouldn't start immediately
        this.playable = true; // If the game is playable
        this.startDelay = 0; // Delay when starting the game
    }

    /**
     * Initialize the game by taking the current time, loading all assets, and creating the event listener.
     */
    init() {
        time = new Date().getTime();
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
        let milliseconds = currentTime - time;
        // Update if the millisecond difference is above the FPS limit
        if (milliseconds >= 1000 / FPS) {
            time = currentTime;
            // If all assets are not yet loaded, draw the loading screen
            if (AssetLoader.loadPercentage() < 1) {
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
                        // FIXME: Fix the code below
                        // if (!Outrun.startDelay)
                        //     Outrun.gameWorld.road.nextLight();
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
        Canvas.canvasContext.fillRect(99, 126, 121 * AssetLoader.loadPercentage(), 12);
        let box = AssetLoader.getSprite("loading/loading-box");
        let text = AssetLoader.getSprite("loading/loading-text");
        if (box != undefined && text != undefined) {
            Canvas.drawStaticImage(box, 98, 125, 124, 15);
            Canvas.drawStaticImage(text, 106, 84, 109, 28);
        }
    }

}

export const MENU_SCENE = "menu";
export const RADIO_SCENE = "radio";
export const IN_GAME_SCENE = "drive";

const FPS = 60; // Frames per second

let time = null;
let currentTime = null;

// TODO: Add the singleton design pattern
export const Outrun = new Game(); // Singleton instance of Game