import AssetLoader from "./engine/core/AssetLoader.js";
import { Player } from "./Player.js";
import { Road, trackNumLanes } from "./Road.js";
import Vector3 from "./engine/geometry/Vector3.js";
import { Outrun } from "./Game.js";
import Canvas from "./engine/geometry/Canvas.js";
import { Segment } from "./Segment.js";

/**
 * This class represents the game world. It contains the road, route, and background.
 */
export class GameWorld {

    constructor() {
        this.road = new Road(new Vector3(0, 0, 0), 0, 0, trackNumLanes); // Road of the game
        this.route = "coconut-beach"; // Current route place
        this.currentColor = AssetLoader.getColor("codes")["coconut-beach"]; // Current colors of the game world
        this.backParallax = 0; // Parallax amount of the back background
        this.frontParallax = 0; // Parallax amount of the front background
    }

    /**
     * This function is called once at each game cycle by the mainLoop()
     * function in the Game class.
     */
    play() {
        // If reached the end of the road, make the game unplayable
        if (this.road.endSegment != null && this.road.findIndex(this.road.endSegment.highCenter.z) < this.road.findIndex(Driver.camera.position.z))
            Outrun.playable = false;
        // If the game is playable, play the driver
        if (Outrun.playable)
            Driver.play();
        // Play all other vehicles in the game
        for (let i = 0; i < this.road.vehicles.length; i++) {
            this.road.vehicles[i].play();
        }
    }

    /**
     * This function is called once at each game cycle by the mainLoop()
     * function in the Game class.
     */
    update() {
        let currentIndex = this.road.findIndex(Driver.camera.position.z); // Current road segment's index
        // Project all road segments on the screen
        for (let i = currentIndex, size = Math.min(this.road.segments.length, currentIndex + Outrun.renderSize); i < size; i++) {
            this.road.segments[i].project();
        }
        // Project the driver on the screen
        Driver.project();
        // Project all other vehicles on the screen
        for (let i = 0; i < this.road.vehicles.length; i++) {
            this.road.vehicles[i].project();
        }
        // Update the current route
        this.route = this.road.findRoute();
        // Mix the colors of the world
        for (let i = 0; i < 9; i++) {
            let key = Object.keys(this.currentColor)[i];
            this.currentColor[key] = Canvas.mix(this.currentColor[key], AssetLoader.getColor("codes")[this.route][key], 1);
        }
        // Do the parallax effect
        let parallaxAmount = Driver.speed * Math.sign(Driver.curveDirection);
        this.backParallax -= backSpeed * parallaxAmount;
        this.frontParallax -= frontSpeed * parallaxAmount;
        if (Math.abs(this.backParallax) > 1) {
            this.backParallax = 0;
        }
        if (Math.abs(this.frontParallax) > 1) {
            this.frontParallax = 0;
        }
    }

    /**
     * This function is called once at each game cycle by the mainLoop()
     * function in the Game class.
     */
    draw() {
        // Draw the background
        Canvas.fillGradient(this.currentColor.skyColor);
        let back = AssetLoader.getSprite("background", this.route, "back");
        let front = AssetLoader.getSprite("background", this.route, "front");
        Canvas.drawStaticImage(back, backWidth * (this.backParallax - 1), backgroundOffset, backWidth, backgroundHeight);
        Canvas.drawStaticImage(back, backWidth * (this.backParallax), backgroundOffset, backWidth, backgroundHeight);
        Canvas.drawStaticImage(back, backWidth * (this.backParallax + 1), backgroundOffset, backWidth, backgroundHeight);
        Canvas.drawStaticImage(front, frontWidth * (this.frontParallax - 1), backgroundOffset, frontWidth, backgroundHeight);
        Canvas.drawStaticImage(front, frontWidth * (this.frontParallax), backgroundOffset, frontWidth, backgroundHeight);
        Canvas.drawStaticImage(front, frontWidth * (this.frontParallax + 1), backgroundOffset, frontWidth, backgroundHeight);
        let currentIndex = this.road.findIndex(Driver.camera.position.z); // Current road segment's index
        let maxRendered = Math.min(this.road.segments.length, currentIndex + Outrun.renderSize) - 1; // Farthest rendered road segment's index
        // Draw all offroads from back to front
        for (let i = maxRendered; i >= currentIndex; i--) {
            let segment = this.road.segments[i];
            let color = segment.isDark ? this.currentColor.darkOffroadColor : this.currentColor.lightOffroadColor;
            if (segment instanceof Segment) {
                Canvas.drawShape(segment.offroad.getCorners(), color);
            } else {
                let subSegment = segment.leftJunction;
                Canvas.drawShape(subSegment.offroad.getCorners(), color);
                subSegment = segment.rightJunction;
                Canvas.drawShape(subSegment.offroad.getCorners(), color);
            }
        }
        // Draw all roads from back to front
        for (let i = maxRendered; i >= currentIndex; i--) {
            let segment = this.road.segments[i];
            let asphaltColor = segment.isDark ? this.currentColor.darkAsphaltColor : this.currentColor.lightAsphaltColor;
            let sideColor = segment.isDark ? this.currentColor.darkSideColor : this.currentColor.lightSideColor;
            let lineColor = segment.isDark ? this.currentColor.darkLineColor : this.currentColor.lightLineColor;
            if (segment instanceof Segment) {
                Canvas.drawShape(segment.asphalt.getCorners(), asphaltColor);
                Canvas.drawShape(segment.leftSide.getCorners(), sideColor);
                Canvas.drawShape(segment.rightSide.getCorners(), sideColor);
                for (let j = 0; j < segment.numLanes - 1; j++) {
                    Canvas.drawShape(segment.lines[j].getCorners(), lineColor);
                }
                for (let j = 0; j < segment.objects.length; j++) {
                    let object = segment.objects[j];
                    let sprite = AssetLoader.getSprite("environment", this.route, object.fileName);
                    if (sprite != undefined)
                        Canvas.drawImage(sprite, object.center.onScreen, object.relWidth, object.relHeight);
                }
            } else {
                let subSegment = segment.leftJunction;
                Canvas.drawShape(subSegment.asphalt.getCorners(), asphaltColor);
                Canvas.drawShape(subSegment.leftSide.getCorners(), sideColor);
                Canvas.drawShape(subSegment.rightSide.getCorners(), sideColor);
                for (let j = 0; j < subSegment.numLanes - 1; j++) {
                    Canvas.drawShape(subSegment.lines[j].getCorners(), lineColor);
                }
                for (let j = 0; j < subSegment.objects.length; j++) {
                    let object = subSegment.objects[j];
                    let sprite = AssetLoader.getSprite("environment", this.route, object.fileName);
                    if (sprite != undefined)
                    Canvas.drawImage(sprite, object.center.onScreen, object.relWidth, object.relHeight);
                }
                subSegment = segment.rightJunction;
                Canvas.drawShape(subSegment.asphalt.getCorners(), asphaltColor);
                Canvas.drawShape(subSegment.leftSide.getCorners(), sideColor);
                Canvas.drawShape(subSegment.rightSide.getCorners(), sideColor);
                for (let j = 0; j < subSegment.numLanes - 1; j++) {
                    Canvas.drawShape(subSegment.lines[j].getCorners(), lineColor);
                }
                for (let j = 0; j < subSegment.objects.length; j++) {
                    let object = subSegment.objects[j];
                    let sprite = AssetLoader.getSprite("environment", this.route, object.fileName);
                    if (sprite != undefined)
                        Canvas.drawImage(sprite, object.center.onScreen, object.relWidth, object.relHeight);
                }
            }
        }
        // Draw the vehicles
        for (let i = this.road.vehicles.length - 1; i >= 0; i--) {
            let vehicle = this.road.vehicles[i];
            let position = this.road.findIndex(vehicle.car.center.z);
            if (position > currentIndex & position < maxRendered)
                Canvas.drawImage(AssetLoader.getSprite("vehicles", vehicle.vehicleType, vehicle.car.fileName),
                                 vehicle.car.center.onScreen,
                                 vehicle.car.relWidth,
                                 vehicle.car.relHeight);
        }
        // Draw the driver's car
        Canvas.drawImage(AssetLoader.getSprite("ferrari", Driver.car.fileName),
                         Driver.car.center.onScreen,
                         Driver.car.relWidth,
                         Driver.car.relHeight);
        // Draw the HUD
        Canvas.drawStaticImage(AssetLoader.getSprite("hud/map", this.route), 301, 210, 16, 11);
        Canvas.drawStaticImage(AssetLoader.getSprite("hud/kmh"), 27, 210, 18, 13);
        Canvas.drawText(Math.floor(Driver.speed / 3).toString());
        // If the road is ending, add new segments
        if (this.road.segments.length - currentIndex < Outrun.renderSize) {
            this.road.addSegments(true);
        }
    }

}

const backSpeed = 0.000001;
const frontSpeed = 0.000002;
const backWidth = 1536;
const frontWidth = 2048;
const backgroundHeight = 256;
const backgroundOffset = -135;

// TODO: Add the singleton design pattern
// FIXME: This should be in the Player.js file
export let Driver = new Player(); // Singleton instance of Player