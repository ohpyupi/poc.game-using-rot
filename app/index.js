// const ROT = require('rot-js');
const { Game } = require('./game');
const {
    startScreen,
    playScreen,
    defeatedScreen,
} = require('./screens');

const game = new Game({
    width: 40,
    height: 20,
    screenWidth: 40,
    screenHeight: 20,
    mapWidth: 500,
    mapHeight: 500, 
});

const bootstrap = () => {
    game.render(document.body);
    game.registerScreens([
        ['start', startScreen],
        ['play', playScreen],
        ['defeated', defeatedScreen]
    ]);
    game.switchScreen('start');
};

bootstrap();
/*
const display = new ROT.Display({
    width: 40,
    height: 20,
    // forceSquareRatio: true,
});


const container = display.getContainer();
display.drawText(5, 2, 'Den of Engineer');
display.drawText(20, 4, 'PayPal Identity');
display.drawText(5, 8,
`Welcome to Den of Engineer. You are an avatar of defect, and your mission is to defeat engineers as much as possible in the den. Show all your power to defeat enginers in the den, and conquer the den!`,
30);
display.drawText(8, 17, 'Press [Enter] to start!');

document.body.appendChild(container);
*/