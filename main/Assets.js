let sprites = {};

function loadAssets() {
  sprites['sky'] = loadSprite('background/sky');
  sprites['cloud'] = loadSprite('background/cloud');
  sprites['mountain'] = loadSprite('background/mountain');
  sprites['forest'] = loadSprite('background/forest');
  sprites['tree'] = loadSprite('environment/tree');
  sprites['straight'] = loadSprite('player/straight');
}

function loadSprite(fileName) {
    var sprite = new Image();
    sprite.src = "./assets/sprites/" + fileName + ".png";
    return sprite;
  }