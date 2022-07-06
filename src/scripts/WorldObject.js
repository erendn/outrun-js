import AssetLoader from "./engine/core/AssetLoader.js";
import Vector3 from "./engine/geometry/Vector3.js";
import { Outrun } from "./Game.js";
import { Driver } from "./GameWorld.js";

/**
 * This is the class to store world objects.
 */
export class WorldObject {

    constructor(center, fileName) {
        this.center = center; // Center point of the object on the ground
        this.fileName = fileName; // File name of the object's sprite
        this.relHeight = 0; // Relative height of the object
        this.relWidth = 0; // Relative width of the object
    }

    /**
     * Project the object on the screen.
     */
    project(measure2) {
        this.center.project();
        console.log("environment", Outrun.gameWorld.route, this.fileName);
        let sprite = AssetLoader.getSprite("environment", Outrun.gameWorld.route, this.fileName);
        this.relWidth = Vector3.calculate(sprite.width, Driver.camera.gap, measure2);
        this.relHeight = Vector3.calculate(sprite.height, Driver.camera.gap, measure2);
    }

}