// This is just the main script to start when "onload" is triggered
import ConfigManager from "./engine/core/ConfigManager.js";

/**
 * Main function of the program.
 */
async function main() {
    // Wait until the configs are ready
    if (!ConfigManager.isReady()) {
        requestAnimationFrame(main);
        return;
    }
    // Load the module dynamically
    const { Outrun } = await import("./Game.js");
    // Start the game
    Outrun.init();
}

window.addEventListener("load", main);