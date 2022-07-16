import AssetLoader from "./engine/core/AssetLoader.js";
import AudioPlayer from "./engine/core/AudioPlayer.js";
import Game from "./Game.js";
import Canvas from "./engine/render/Canvas.js";
import { MENU_SCENE, RADIO_SCENE, IN_GAME_SCENE } from "./constants/Scenes.js";
import { INTERFACE_CANVAS } from "./constants/Canvas.js";

/**
 * This class manages the audio in the game. It can currently play main menu
 * sounds and in-game music.
 */
class Radio {

    constructor() {
        this.delay = 0; // Used for radio signal animation
        this.dots = 3; // Number of dots in the radio signal animation
        this.music = 1; // Number of music to be played
        this.backgroundChange = 0; // Delay for the wave animation
        this.background = 0; // Number of wave sprite for the animation
        this.tree = 0; // Number of tree sprite for the animation
        this.flash = 0; // Number of flash sprite for the animation
        this.waveStarted = false;
        this.musicStarted = false;
    }

    /**
     * Return a unique random number considering the current value.
     */
    static getRandom(current, range) {
        do {
            var random = Math.floor(Math.random() * range);
        } while (current == random);
        return random;
    }

    /**
     * This function is called once at each game cycle by the mainLoop()
     * function in the Game class.
     */
    update() {
        // Play animations and sounds, and select the music to be played in the 
        // game during the menu and radio scenes.
        if (Game.scene == MENU_SCENE | Game.scene == RADIO_SCENE) {
            // Reduce delay in each update. When delay reaches zero, choose a
            // random animation to be played.
            this.delay = (this.delay + 1) % radioDelay;
            if (!this.delay) {
                this.dots--;
                if (this.dots < 0) {
                    this.dots = 3 + Radio.getRandom(this.dots - 3, 4);
                }
                if (this.backgroundChange == 0) {
                    this.background = Radio.getRandom(this.background, 6);
                    this.backgroundChange = 1;
                } else {
                    this.backgroundChange--;
                }
                this.tree = Radio.getRandom(this.tree, 3);
                this.flash = (this.flash + 1) % 10;
            }
            if (!this.waveStarted) {
                AudioPlayer.play("sample/wave", true);
                this.waveStarted = true;
            }
        // If this is the in-game scene, play the same music continuously.
        // TODO: Change the music once it finishes
        } else if (Game.scene == IN_GAME_SCENE) {
            if (!this.musicStarted) {
                AudioPlayer.play("music/music-" + this.music, true);
                this.musicStarted = true;
            }
        }
    }

    /**
     * This function is called once at each game cycle by the mainLoop()
     * function in the Game class.
     */
    draw() {
        Canvas.fill(INTERFACE_CANVAS, "#008BFF"); // Background color in the menu and radio scenes
        // Draw all sprites to the top of the background color
        Canvas.drawStaticImage(INTERFACE_CANVAS, AssetLoader.getSprite("radio/radio-car"), 0, 0, Canvas.width, Canvas.height);
        Canvas.drawStaticImage(INTERFACE_CANVAS, AssetLoader.getSprite("radio/radio"), 127, 166, 126, 30);
        Canvas.drawStaticImage(INTERFACE_CANVAS, AssetLoader.getSprite("radio", "radio-freq-" + this.music), 143, 173, 24, 7);
        for (let i = 0; i < this.dots; i++) {
            Canvas.drawStaticImage(INTERFACE_CANVAS, AssetLoader.getSprite("radio", "radio-dot-" + (i < 4 ? "green" : "red")), 156 + i * 3, 187, 2, 2);
            Canvas.drawStaticImage(INTERFACE_CANVAS, AssetLoader.getSprite("radio", "radio-dot-" + (i < 4 ? "green" : "red")), 156 + i * 3, 190, 2, 2);
        }
        Canvas.drawStaticImage(INTERFACE_CANVAS, AssetLoader.getSprite("radio", "radio-hand-" + this.music), 117, 165, 133, 59);
        if (Game.scene == MENU_SCENE) {
            Canvas.drawStaticImage(INTERFACE_CANVAS, AssetLoader.getSprite("menu", "logo-bg-" + this.background), 72, 18, 176, 88);
            Canvas.drawStaticImage(INTERFACE_CANVAS, AssetLoader.getSprite("menu", "logo-road"), 81, 80, 95, 25);
            Canvas.drawStaticImage(INTERFACE_CANVAS, AssetLoader.getSprite("menu", "logo-car"), 127, 66, 64, 39);
            Canvas.drawStaticImage(INTERFACE_CANVAS, AssetLoader.getSprite("menu", "logo-tree-" + this.tree), 75, 30, 46, 57);
            Canvas.drawStaticImage(INTERFACE_CANVAS, AssetLoader.getSprite("menu", "logo-text"), 109, 33, 135, 36);
            if (this.flash < 5)
                Canvas.drawStaticImage(INTERFACE_CANVAS, AssetLoader.getSprite("text", "press-enter"), 111, 123, 97, 8);
        } else {
            Canvas.drawStaticImage(INTERFACE_CANVAS, AssetLoader.getSprite("text", "select-music"), 65, 67, 191, 14);
            if (this.music == 0) {
                Canvas.drawStaticImage(INTERFACE_CANVAS, AssetLoader.getSprite("text", "music-0"), 72, 88, 175, 16);
            } else if (this.music == 1) {
                Canvas.drawStaticImage(INTERFACE_CANVAS, AssetLoader.getSprite("text", "music-1"), 96, 88, 127, 16);
            } else {
                Canvas.drawStaticImage(INTERFACE_CANVAS, AssetLoader.getSprite("text", "music-2"), 108, 88, 103, 16);
            }
        }
    }

}

const radioDelay = 6; // Used for radio signal animation

const _Radio = new Radio(); // Singleton instance
export default _Radio;