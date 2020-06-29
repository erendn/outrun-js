let sprites = {};
let sounds = {};

function loadAssets() {
   //\\//\\ MENU ASSETS //\\//\\
  // LOADING MENU SPRITES
  sprites['logo-bg-0'] = loadSprite('menu/logo-bg-0');
  sprites['logo-bg-1'] = loadSprite('menu/logo-bg-1');
  sprites['logo-bg-2'] = loadSprite('menu/logo-bg-2');
  sprites['logo-bg-3'] = loadSprite('menu/logo-bg-3');
  sprites['logo-bg-4'] = loadSprite('menu/logo-bg-4');
  sprites['logo-bg-5'] = loadSprite('menu/logo-bg-5');
  sprites['logo-road'] = loadSprite('menu/logo-road');
  sprites['logo-car'] = loadSprite('menu/logo-car');
  sprites['logo-tree-0'] = loadSprite('menu/logo-tree-0');
  sprites['logo-tree-1'] = loadSprite('menu/logo-tree-1');
  sprites['logo-tree-2'] = loadSprite('menu/logo-tree-2');
  sprites['logo-text'] = loadSprite('menu/logo-text');
  //\\//\\ RADIO ASSETS //\\//\\
  // LOADING RADIO SPRITES
  sprites['radio-car'] = loadSprite('radio/radio-car');
  sprites['radio'] = loadSprite('radio/radio');
  sprites['radio-freq-0'] = loadSprite('radio/radio-freq-0');
  sprites['radio-freq-1'] = loadSprite('radio/radio-freq-1');
  sprites['radio-freq-2'] = loadSprite('radio/radio-freq-2');
  sprites['radio-dot-red'] = loadSprite('radio/radio-dot-red');
  sprites['radio-dot-green'] = loadSprite('radio/radio-dot-green');
  sprites['radio-hand-0'] = loadSprite('radio/radio-hand-0');
  sprites['radio-hand-1'] = loadSprite('radio/radio-hand-1');
  sprites['radio-hand-2'] = loadSprite('radio/radio-hand-2');
  // LOADING RADIO SAMPLES
  sounds['wave'] = loadSound('sample/wave');
  sounds['coin'] = loadSound('sample/coin');
  //\\//\\ IN-GAME ASSETS //\\//\\
  // LOADING IN-GAME SPRITES
  sprites['sky'] = loadSprite('background/sky');
  sprites['cloud'] = loadSprite('background/cloud');
  sprites['mountain'] = loadSprite('background/mountain');
  sprites['forest'] = loadSprite('background/forest');
  sprites['tree'] = loadSprite('environment/tree');
  sprites['tunnel'] = loadSprite('environment/tunnel');
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
  // LOADING IN-GAME MUSIC
  sounds['music-0'] = loadSound('music/music-0');
  sounds['music-1'] = loadSound('music/music-1');
  sounds['music-2'] = loadSound('music/music-2');
  //\\//\\ TEXT ASSETS //\\//\\
  sprites['press-enter'] = loadSprite('text/press-enter');
  sprites['select-music'] = loadSprite('text/select-music');
  sprites['music-0'] = loadSprite('text/music-0');
  sprites['music-1'] = loadSprite('text/music-1');
  sprites['music-2'] = loadSprite('text/music-2');
}

function loadSprite(fileName) {
  var sprite = new Image();
  sprite.src = "./assets/sprites/" + fileName + ".png";
  return sprite;
}

function loadSound(fileName) {
  var sample = new Audio();
  sample.src = "./assets/sounds/" + fileName + ".wav";
  return sample;
}