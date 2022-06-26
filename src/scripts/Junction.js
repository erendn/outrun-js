import { Segment, invisSegment } from "./Segment.js";

/**
 * This class is used for junctions in the game.
 */
export class Junction {

    constructor(prevJunction, curve, hill, index, isInitial) {
        this.numLanes = prevJunction.numLanes;
        this.isDark = index % (2 * invisSegment) < invisSegment;
        this.leftJunction = new Segment(prevJunction.leftJunction, -curve, hill, index, isInitial, true);
        this.rightJunction = new Segment(prevJunction.rightJunction, curve, hill, index, isInitial, true);
        this.isInitial = isInitial;
    }

    /**
     * Project the junction on the screen.
     */
    project() {
        this.leftJunction.project();
        this.rightJunction.project();
    }

}