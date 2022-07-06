/**
 * This class represents the camera in the game. This camera is used as a
 * reference point to calculate all vectors.
 */
class Camera {

    /**
     * Setup the camera properties.
     */
    setup(width, height, altitude, fov, position) {
        this.width = width; // Width of camera screen
        this.height = height; // Height of camera screen
        this.altitude = altitude; // Altitude of the lower edge of camera screen
        this.fov = fov; // Field of view
        this.gap = this.width / (2 * Math.tan(this.fov * Math.PI / 360)); // Gap between camera focus and camera screen
        this.rotation = 0; // Rotation angle of the camera
        this.position = position; // Position of camera focus in the game world    
    }

}

const _Camera = new Camera(); // Singleton instance
export default _Camera;