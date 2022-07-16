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
import { MENU_SCENE, RADIO_SCENE, IN_GAME_SCENE } from "./constants/Scenes.js";
import { INTERFACE_CANVAS } from "./constants/Canvas.js";

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
        Canvas.clear(INTERFACE_CANVAS);
        GameWorld.reset();
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
            _Game.drawLoading();
        } else {
            // Update the radio
            Radio.update();
            // Draw the current scene
            if (_Game.scene == MENU_SCENE | _Game.scene == RADIO_SCENE) {
                Radio.draw();
            } else if (_Game.scene == IN_GAME_SCENE) {
                GameWorld.project();
                GameWorld.draw();
            }
        }
    }

    /**
     * Draw the loading screen.
     */
    drawLoading() {
        Canvas.fill(INTERFACE_CANVAS, "#008BFF");
        Canvas.context[INTERFACE_CANVAS].fillStyle = "#000000";
        Canvas.context[INTERFACE_CANVAS].fillRect(99, 126, 121, 12);
        Canvas.context[INTERFACE_CANVAS].fillStyle = "#F7F700";
        Canvas.context[INTERFACE_CANVAS].fillRect(99, 126, 121 * AssetLoader.loadPercentage(), 12);
        let box = AssetLoader.getSprite("loading/loading-box");
        let text = AssetLoader.getSprite("loading/loading-text");
        if (box != undefined && text != undefined) {
            Canvas.drawStaticImage(INTERFACE_CANVAS, box, 98, 125, 124, 15);
            Canvas.drawStaticImage(INTERFACE_CANVAS, text, 106, 84, 109, 28);
        }
    }

}

const _Game = new Game(); // Singleton instance
export default _Game;