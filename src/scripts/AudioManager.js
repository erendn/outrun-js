/**
 * This class manages the audio in the game. It can currently play main menu
 * sounds and in-game music.
 */
class AudioManager {

    constructor() {
        this.delay = 0; // Used for radio signal animation
        this.dots = 3; // Number of dots in the radio signal animation
        this.music = 1; // Number of music to be played
        this.background = 0; // Number of wave sprite for the animation
        this.tree = 0; // Number of tree sprite for the animation
        this.flash = 0; // Number of flash sprite for the animation
    }

    /**
     * This function is called once at each game cycle by the mainLoop()
     * function in the Game class.
     */
    update() {
        // Play animations and sounds, and select the music to be played in the 
        // game during the menu and radio scenes.
        if (Outrun.scene == MENU_SCENE | Outrun.scene == RADIO_SCENE) {
            // Reduce delay in each update. When delay reaches zero, choose a
            // random animation to be played.
            this.delay = (this.delay + 1) % radioDelay;
            if (!this.delay) {
                this.dots--;
                if (this.dots < 0) {
                    this.dots = 3 + Math.random() * 4;
                }
                // TODO: Randomize the animations below
                this.background = (this.background + 1) % 6;
                this.tree = (this.tree + 1) % 3;
                this.flash = (this.flash + 1) % 10;
            }
            // If the wave sound has stopped, play it again.
            if (sounds["wave"].paused)
                sounds["wave"].play().catch(error => {});
        // If this is the in-game scene, play the same music continuously.
        // TODO: Change the music once it finishes
        } else if (Outrun.scene == IN_GAME_SCENE) {
            if (sounds["music-" + this.music].paused)
                sounds["music-" + this.music].play();
        }
    }

    /**
     * This function is called once at each game cycle by the mainLoop()
     * function in the Game class.
     */
    draw() {
        Canvas.fill("#008BFF"); // Background color in the menu and radio scenes
        // Draw all sprites to the top of the background color
        Canvas.drawStaticImage(sprites["radio-car"], 0, 0, Canvas.width, Canvas.height);
        Canvas.drawStaticImage(sprites["radio"], 127, 166, 126, 30);
        Canvas.drawStaticImage(sprites["radio-freq-" + this.music], 143, 173, 24, 7);
        for (var i = 0; i < this.dots; i++) {
            Canvas.drawStaticImage(sprites["radio-dot-" + (i < 4 ? "green" : "red")], 156 + i * 3, 187, 2, 2);
            Canvas.drawStaticImage(sprites["radio-dot-" + (i < 4 ? "green" : "red")], 156 + i * 3, 190, 2, 2);
        }
        Canvas.drawStaticImage(sprites["radio-hand-" + this.music], 117, 165, 133, 59);
        if (Outrun.scene == MENU_SCENE) {
            Canvas.drawStaticImage(sprites["logo-bg-" + this.background], 72, 18, 176, 88);
            Canvas.drawStaticImage(sprites["logo-road"], 81, 80, 95, 25);
            Canvas.drawStaticImage(sprites["logo-car"], 127, 66, 64, 39);
            Canvas.drawStaticImage(sprites["logo-tree-" + this.tree], 75, 30, 46, 57);
            Canvas.drawStaticImage(sprites["logo-text"], 109, 33, 135, 36);
            if (this.flash < 5)
                Canvas.drawStaticImage(sprites["press-enter"], 111, 123, 97, 8);
        } else {
            Canvas.drawStaticImage(sprites["select-music"], 65, 67, 191, 14);
            if (this.music == 0) {
                Canvas.drawStaticImage(sprites["music-0"], 72, 88, 175, 16);
            } else if (this.music == 1) {
                Canvas.drawStaticImage(sprites["music-1"], 96, 88, 127, 16);
            } else {
                Canvas.drawStaticImage(sprites["music-2"], 108, 88, 103, 16);
            }
        }
    }

}

const radioDelay = 6; // Used for radio signal animation

// TODO: Add the singleton design pattern
let Radio = new AudioManager(); // Singleton instance of AudioManager