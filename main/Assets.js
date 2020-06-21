let sprites = {};

function loadAssets() {
  sprites['sky'] = loadSprite('background/sky');
  sprites['cloud'] = loadSprite('background/cloud');
  sprites['mountain'] = loadSprite('background/mountain');
  sprites['forest'] = loadSprite('background/forest');
  sprites['tree'] = loadSprite('environment/tree');
  sprites['straight'] = loadSprite('player/straight');
  sprites['left'] = loadSprite('player/left');
  sprites['right'] = loadSprite('player/right');
  sprites['left-hard'] = loadSprite('player/left-hard');
  sprites['right-hard'] = loadSprite('player/right-hard');
  sprites['hill-straight'] = loadSprite('player/hill-straight');
  sprites['hill-left'] = loadSprite('player/hill-left');
  sprites['hill-right'] = loadSprite('player/hill-right');
  sprites['hill-left-hard'] = loadSprite('player/hill-left-hard');
  sprites['hill-right-hard'] = loadSprite('player/hill-right-hard');
}

function loadSprite(fileName) {
    var sprite = new Image();
    sprite.src = "./assets/sprites/" + fileName + ".png";
    return sprite;
  }