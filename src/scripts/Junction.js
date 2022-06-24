class Junction {

    constructor(prevJunction, curve, hill, index, isInitial) {
        this.numLanes = prevJunction.numLanes;
        this.isDark = index % (2 * invisSegment) < invisSegment;
        this.leftJunction = new Segment(prevJunction.leftJunction, -curve, hill, index, isInitial, true);
        this.rightJunction = new Segment(prevJunction.rightJunction, curve, hill, index, isInitial, true);
        this.isInitial = isInitial;
    }

    project() {
        this.leftJunction.project();
        this.rightJunction.project();
    }

}