import AssetLoader from "./engine/core/AssetLoader.js";
import Clock from "./engine/core/Clock.js";
import SceneManager from "./engine/core/SceneManager.js";
import Radio from "./Radio.js";
import Canvas from "./engine/render/Canvas.js";
import Camera from "./engine/render/Camera.js";
import GameWorld from "./engine/render/GameWorld.js";
import Segment from "./engine/render/Segment.js";
import GroundTile from "./tiles/GroundTile.js";
import AsphaltTile from "./tiles/AsphaltTile.js";
import SideTile from "./tiles/SideTile.js";
import LineTile from "./tiles/LineTile.js";
import { setup } from "./listeners/Utils.js";
import * as SCENES from "./constants/Scenes.js";
import { INTERFACE_CANVAS } from "./constants/Canvas.js";
import * as FONTS from "./constants/Fonts.js";

/**
 * This is the game class that executes the main function of the game.
 */
class Game {

    constructor() {
        // FIXME: The game shouldn't start immediately
        this.playable = true; // If the game is playable
        this.startDelay = 0; // Delay when starting the game
        this.route = "coconut-beach"; // FIXME: Move somewhere else
        SceneManager.set(SCENES.LOADING_SCENE);
    }

    /**
     * Initialize the game by taking the current time, loading all assets, and creating the event listener.
     */
    init() {
        setup();
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
        const scene = SceneManager.get();
        // If all assets are not yet loaded, draw the loading screen
        if (scene == SCENES.LOADING_SCENE) {
            _Game.drawLoading();
            if (AssetLoader.loadPercentage() == 1) {
                SceneManager.set(SCENES.MENU_SCENE);
            }
        } else {
            // Update the radio
            Radio.update();
            // Draw the current scene
            if (scene == SCENES.MENU_SCENE || scene == SCENES.RADIO_SCENE) {
                Radio.draw();
            } else if (scene == SCENES.IN_GAME_SCENE) {
                GameWorld.project();
                GameWorld.draw();
            }
        }
    }

    /**
     * Draw the loading screen.
     */
    drawLoading() {
        const x = 85;
        const y = 127;
        const width = 150;
        const height = 10;
        Canvas.fill(INTERFACE_CANVAS, "#008BFF");
        Canvas.context[INTERFACE_CANVAS].strokeStyle = "#000000";
        Canvas.context[INTERFACE_CANVAS].strokeRect(x + 0.5, y + 0.5, width + 1, height + 1);
        Canvas.context[INTERFACE_CANVAS].strokeStyle = "#FFFFFF";
        Canvas.context[INTERFACE_CANVAS].strokeRect(x - 0.5, y - 0.5, width + 1, height + 1);
        Canvas.context[INTERFACE_CANVAS].fillStyle = "#000000";
        Canvas.context[INTERFACE_CANVAS].fillRect(x, y, width, height);
        Canvas.context[INTERFACE_CANVAS].fillStyle = "#F7F700";
        Canvas.context[INTERFACE_CANVAS].fillRect(x, y, width * AssetLoader.loadPercentage(), height);
        Canvas.drawText(INTERFACE_CANVAS, FONTS.YELLOW_LARGE_FONT, "loading", 16.5, 13);
    }

}

const _Game = new Game(); // Singleton instance
export default _Game;