import AssetLoader from "./engine/core/AssetLoader.js";
import Clock from "./engine/core/Clock.js";
import Radio from "./Radio.js";
import Canvas from "./engine/render/Canvas.js";
import EventListener from "./EventListener.js";
import Camera from "./engine/render/Camera.js";
import GameWorld from "./engine/render/GameWorld.js";
import Segment from "./engine/render/Segment.js";
import GroundTile from "./tiles/GroundTile.js";
import AsphaltTile from "./tiles/AsphaltTile.js";
import SideTile from "./tiles/SideTile.js";
import LineTile from "./tiles/LineTile.js";

/**
 * This is the game class that executes the main function of the game.
 */
class Game {

    constructor() {
        this.scene = MENU_SCENE; // Current scene of the game
        // FIXME: The game shouldn't start immediately
        this.playable = true; // If the game is playable
        this.startDelay = 0; // Delay when starting the game
        this.route = "coconut-beach"; // FIXME: Move somewhere else
    }

    /**
     * Initialize the game by taking the current time, loading all assets, and creating the event listener.
     */
    init() {
        Clock.subscribe(this.mainLoop);
        Clock.startClock();
    }

    /**
     * Create a new game.
     */
    setup() {
        GameWorld.reset();
        // FIXME: Don't use window size below, it's irrelevant to the canvas sizes
        Camera.setup(Canvas.width, Canvas.height, 1000, 120);
        let segment = null;
        let ground = null;
        let asphalt = null;
        let sides = [null, null];
        let lines = [null, null, null, null, null, null];
        for (let i = 0; i < 1001; ++i) {
            segment = new Segment(segment, 0, 0, i % (2 * 6) < 6);
            ground = new GroundTile(ground, segment);
            asphalt = new AsphaltTile(asphalt, segment);
            for (let j = 0; j < 2; ++j) {
                sides[j] = new SideTile(sides[j], segment, j * 2 - 1);
            }
            for (let j = 0; j < 5; ++j) {
                lines[j] = new LineTile(lines[j], segment, j - 2);
            }
            segment.addTile(ground);
            segment.addTile(asphalt);
            for (let j = 0; j < 2; ++j) {
                segment.addTile(sides[j]);
            }
            for (let j = 0; j < 5; ++j) {
                segment.addTile(lines[j]);
            }
            if (i == 0) {
                segment.project();
            } else {
                GameWorld.addSegment(segment);
            }
        }
    }

    /**
     * This is the main loop function of the game. Once executed, it calls itself continuously.
     */
    mainLoop() {
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
                GameWorld.project();
                GameWorld.draw();
            }
        }
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

// TODO: Add the singleton design pattern
export const Outrun = new Game(); // Singleton instance of Game