export const GROUND_SKEW = 0; // Ground is not skewed
export const GROUND_WIDTH = 1; // Ground's width is infinite

export const SIDE_WIDTH = 300; // Side lines' width

export const LINE_WIDTH = 150; // Road lines' width

export const NUM_LANES = 6; // Number of lanes on the road
export const LANE_WIDTH = 1200; // Width of a road lane
export const ASPHALT_SKEW = 0; // Asphalt is not skewed
export const ASPHALT_WIDTH = LANE_WIDTH * NUM_LANES + LINE_WIDTH * (NUM_LANES - 1) + SIDE_WIDTH * 2; // Asphalt's width

export const LINE_SKEW = LANE_WIDTH; // Road lines' skew
export const SIDE_SKEW = (SIDE_WIDTH - ASPHALT_WIDTH) / 2; // Side lines' skew