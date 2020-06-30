let sprites = {};
let sounds = {};
let colors = {};

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
  sprites['coconut-beach'] = {
    back: loadSprite('background/coconut-beach/back'),
    front: loadSprite('background/coconut-beach/front'),
    tunnel: loadSprite('environment/coconut-beach/tunnel'),
    terrain: loadSprite('environment/coconut-beach/terrain'),
    tree: loadSprite('environment/coconut-beach/tree'),
    bush: loadSprite('environment/coconut-beach/bush'),
    sail: loadSprite('environment/coconut-beach/sail')
  };
  // LOADING FERRARI SPRITES
  for (var i = 0; i < 2; i++) {
    sprites['down-hardleft-' + i] = loadSprite('ferrari/down-hardleft-' + i);
    sprites['down-hardright-' + i] = loadSprite('ferrari/down-hardright-' + i);
    sprites['down-left-' + i] = loadSprite('ferrari/down-left-' + i);
    sprites['down-right-' + i] = loadSprite('ferrari/down-right-' + i);
    sprites['down-straight-' + i] = loadSprite('ferrari/down-straight-' + i);

    sprites['hardleft-' + i] = loadSprite('ferrari/hardleft-' + i);
    sprites['hardright-' + i] = loadSprite('ferrari/hardright-' + i);
    sprites['left-' + i] = loadSprite('ferrari/left-' + i);
    sprites['right-' + i] = loadSprite('ferrari/right-' + i);
    sprites['straight-' + i] = loadSprite('ferrari/straight-' + i);

    sprites['up-hardleft-' + i] = loadSprite('ferrari/up-hardleft-' + i);
    sprites['up-hardright-' + i] = loadSprite('ferrari/up-hardright-' + i);
    sprites['up-left-' + i] = loadSprite('ferrari/up-left-' + i);
    sprites['up-right-' + i] = loadSprite('ferrari/up-right-' + i);
    sprites['up-straight-' + i] = loadSprite('ferrari/up-straight-' + i);


    sprites['down-hardleft-brake-' + i] = loadSprite('ferrari/down-hardleft-brake-' + i);
    sprites['down-hardright-brake-' + i] = loadSprite('ferrari/down-hardright-brake-' + i);
    sprites['down-left-brake-' + i] = loadSprite('ferrari/down-left-brake-' + i);
    sprites['down-right-brake-' + i] = loadSprite('ferrari/down-right-brake-' + i);
    sprites['down-straight-brake-' + i] = loadSprite('ferrari/down-straight-brake-' + i);

    sprites['hardleft-brake-' + i] = loadSprite('ferrari/hardleft-brake-' + i);
    sprites['hardright-brake-' + i] = loadSprite('ferrari/hardright-brake-' + i);
    sprites['left-brake-' + i] = loadSprite('ferrari/left-brake-' + i);
    sprites['right-brake-' + i] = loadSprite('ferrari/right-brake-' + i);
    sprites['straight-brake-' + i] = loadSprite('ferrari/straight-brake-' + i);

    sprites['up-hardleft-brake-' + i] = loadSprite('ferrari/up-hardleft-brake-' + i);
    sprites['up-hardright-brake-' + i] = loadSprite('ferrari/up-hardright-brake-' + i);
    sprites['up-left-brake-' + i] = loadSprite('ferrari/up-left-brake-' + i);
    sprites['up-right-brake-' + i] = loadSprite('ferrari/up-right-brake-' + i);
    sprites['up-straight-brake-' + i] = loadSprite('ferrari/up-straight-brake-' + i);
  }
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
  //\\//\\ COLORS //\\//\\
  colors['coconut-beach'] = {
    skyColor: '#008BFF',
    darkOffroadColor: '#D9C7B9',
    lightOffroadColor: '#E0CCBF',
    darkAsphaltColor: '#777576',
    lightAsphaltColor: '#797778',
    darkSideColor: '#FF0000',
    lightSideColor: '#F7F7F7',
    darkLineColor: '#777576',
    lightLineColor: '#F7F7F7'
  };
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