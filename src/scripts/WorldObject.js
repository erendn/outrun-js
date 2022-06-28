import Vector3 from "./engine/Vector3.js";
import { dimensions } from "./Assets.js";
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
        this.relWidth = Vector3.calculate(dimensions[Outrun.gameWorld.route][this.fileName].width, Driver.camera.gap, measure2);
        this.relHeight = Vector3.calculate(dimensions[Outrun.gameWorld.route][this.fileName].height, Driver.camera.gap, measure2);
    }

}