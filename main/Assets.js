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
  sprites['gateaway'] = {
    back: loadSprite('background/gateaway/back'),
    front: loadSprite('background/gateaway/front'),
  };
  sprites['devils-canyon'] = {
    back: loadSprite('background/devils-canyon/back'),
    front: loadSprite('background/devils-canyon/front'),
  };
  sprites['desert'] = {
    back: loadSprite('background/desert/back'),
    front: loadSprite('background/desert/front'),
  };
  sprites['alps'] = {
    back: loadSprite('background/alps/back'),
    front: loadSprite('background/alps/front'),
  };
  sprites['cloudy-mountain'] = {
    back: loadSprite('background/cloudy-mountain/back'),
    front: loadSprite('background/cloudy-mountain/front'),
  };
  sprites['wilderness'] = {
    back: loadSprite('background/wilderness/back'),
    front: loadSprite('background/wilderness/front'),
  };
  sprites['old-capital'] = {
    back: loadSprite('background/old-capital/back'),
    front: loadSprite('background/old-capital/front'),
  };
  sprites['wheat-field'] = {
    back: loadSprite('background/wheat-field/back'),
    front: loadSprite('background/wheat-field/front'),
  };
  sprites['seaside-town'] = {
    back: loadSprite('background/seaside-town/back'),
    front: loadSprite('background/seaside-town/front'),
  };
  sprites['vineyard'] = {
    back: loadSprite('background/vineyard/back'),
    front: loadSprite('background/vineyard/front'),
  };
  sprites['death-valley'] = {
    back: loadSprite('background/death-valley/back'),
    front: loadSprite('background/death-valley/front'),
  };
  sprites['desolation-hill'] = {
    back: loadSprite('background/desolation-hill/back'),
    front: loadSprite('background/desolation-hill/front'),
  };
  sprites['autobahn'] = {
    back: loadSprite('background/autobahn/back'),
    front: loadSprite('background/autobahn/front'),
  };
  sprites['lakeside'] = {
    back: loadSprite('background/lakeside/back'),
    front: loadSprite('background/lakeside/front'),
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
  colors['gateaway'] = {
    skyColor: '#00BEDA',
    darkOffroadColor: '#8F9766',
    lightOffroadColor: '#9AA270',
    darkAsphaltColor: '#777576',
    lightAsphaltColor: '#797778',
    darkSideColor: '#FF0000',
    lightSideColor: '#F7F7F7',
    darkLineColor: '#777576',
    lightLineColor: '#F7F7F7'
  };
  colors['devils-canyon'] = {
    skyColor: '#FFC25E',
    darkOffroadColor: '#809473',
    lightOffroadColor: '#8CA17F',
    darkAsphaltColor: '#89857A',
    lightAsphaltColor: '#9A958D',
    darkSideColor: '#8E0C00',
    lightSideColor: '#CAC6C7',
    darkLineColor: '#89857A',
    lightLineColor: '#CAC6C7'
  };
  colors['desert'] = {
    skyColor: '#000FFF',
    darkOffroadColor: '#CEBCA2',
    lightOffroadColor: '#DAC9AE',
    darkAsphaltColor: '#AB9C8F',
    lightAsphaltColor: '#B8A89B',
    darkSideColor: '#AB9C8F',
    lightSideColor: '#B8A89B',
    darkLineColor: '#AB9C8F',
    lightLineColor: '#B8A89B'
  };
  colors['alps'] = {
    skyColor: '#005AFF',
    darkOffroadColor: '#8BA17D',
    lightOffroadColor: '#95AC87',
    darkAsphaltColor: '#7E7C7E',
    lightAsphaltColor: '#8A878A',
    darkSideColor: '#7E7C7E',
    lightSideColor: '#C9C9C3',
    darkLineColor: '#7E7C7E',
    lightLineColor: '#C9C9C3'
  };
  colors['cloudy-mountain'] = {
    skyColor: '#938BFA',
    darkOffroadColor: '#959D6C',
    lightOffroadColor: '#A2AA75',
    darkAsphaltColor: '#777576',
    lightAsphaltColor: '#817F80',
    darkSideColor: '#777576',
    lightSideColor: '#C4C2C5',
    darkLineColor: '#777576',
    lightLineColor: '#C4C2C5'
  };
  colors['wilderness'] = {
    skyColor: '#D8C2A3',
    darkOffroadColor: '#B18F73',
    lightOffroadColor: '#BE9C7E',
    darkAsphaltColor: '#B8987B',
    lightAsphaltColor: '#C7A687',
    darkSideColor: '#B8987B',
    lightSideColor: '#C7A687',
    darkLineColor: '#B8987B',
    lightLineColor: '#C7A687'
  };
  colors['old-capital'] = {
    skyColor: '#7642FD',
    darkOffroadColor: '#523627',
    lightOffroadColor: '#5B3F2F',
    darkAsphaltColor: '#4E3F3F',
    lightAsphaltColor: '#574848',
    darkSideColor: '#4E3F3F',
    lightSideColor: '#C29E82',
    darkLineColor: '#4E3F3F',
    lightLineColor: '#C29E82'
  };
  colors['wheat-field'] = {
    skyColor: '#FFC25E',
    darkOffroadColor: '#825E00',
    lightOffroadColor: '#866404',
    darkAsphaltColor: '#646365',
    lightAsphaltColor: '#6F6E70',
    darkSideColor: '#646365',
    lightSideColor: '#C2C0C2',
    darkLineColor: '#646365',
    lightLineColor: '#C2C0C2'
  };
  colors['seaside-town'] = {
    skyColor: '#3C74FE',
    darkOffroadColor: '#D2A479',
    lightOffroadColor: '#DAAF82',
    darkAsphaltColor: '#868277',
    lightAsphaltColor: '#979288',
    darkSideColor: '#868277',
    lightSideColor: '#CDC9CE',
    darkLineColor: '#868277',
    lightLineColor: '#CDC9CE'
  };
  colors['vineyard'] = {
    skyColor: '#0BA1FF',
    darkOffroadColor: '#A3A95C',
    lightOffroadColor: '#B0B566',
    darkAsphaltColor: '#7F7D7E',
    lightAsphaltColor: '#898687',
    darkSideColor: '#7F7D7E',
    lightSideColor: '#ACAAAC',
    darkLineColor: '#7F7D7E',
    lightLineColor: '#ACAAAC'
  };
  colors['death-valley'] = {
    skyColor: '#6255FE',
    darkOffroadColor: '#AA7B5D',
    lightOffroadColor: '#AD7E5E',
    darkAsphaltColor: '#6C5D5D',
    lightAsphaltColor: '#776868',
    darkSideColor: '#6C5D5D',
    lightSideColor: '#C6C0C4',
    darkLineColor: '#6C5D5D',
    lightLineColor: '#C6C0C4'
  };
  colors['desolation-hill'] = {
    skyColor: '#EFECDC',
    darkOffroadColor: '#CEBEB1',
    lightOffroadColor: '#D9CABE',
    darkAsphaltColor: '#848284',
    lightAsphaltColor: '#908D90',
    darkSideColor: '#848284',
    lightSideColor: '#CFCCCF',
    darkLineColor: '#848284',
    lightLineColor: '#CFCCCF'
  };
  colors['autobahn'] = {
    skyColor: '#7642FD',
    darkOffroadColor: '#839876',
    lightOffroadColor: '#8EA481',
    darkAsphaltColor: '#696B86',
    lightAsphaltColor: '#747592',
    darkSideColor: '#8C0C00',
    lightSideColor: '#C5C4C5',
    darkLineColor: '#696B86',
    lightLineColor: '#C5C4C5'
  };
  colors['lakeside'] = {
    skyColor: '#FEAAA4',
    darkOffroadColor: '#B8A79B',
    lightOffroadColor: '#C6B4A8',
    darkAsphaltColor: '#7D7569',
    lightAsphaltColor: '#877F72',
    darkSideColor: '#7D7569',
    lightSideColor: '#C8C1C2',
    darkLineColor: '#7D7569',
    lightLineColor: '#C8C1C2'
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