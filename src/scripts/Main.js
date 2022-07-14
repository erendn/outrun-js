// This is just the main script to start when "onload" is triggered
import ConfigManager from "./engine/core/ConfigManager.js";

async function main() {
    // Wait until the configs are ready
    if (!ConfigManager.isReady()) {
        requestAnimationFrame(main);
        return;
    }
    // Load the module dynamically
    const { Outrun } = await import("./Game.js");
    Outrun.init();
} 

window.addEventListener("load", main);