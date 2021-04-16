const { KEYS } = require('rot-js');

const startScreen = {
    enter: () => {},
    exit: () => {},
    render: ({ display }) => {
        display.drawText(5, 2, 'Den of Engineer');
        display.drawText(25, 4, 'PayPal');
        display.drawText(5, 8,
            `Welcome to Den of Engineer. You are an avatar of defect, and your mission is to defeat engineers, and conquer the den!`,
            30);
        display.drawText(7, 17, 'Press [Enter] to start!');
    },
    handleInput: (game, eventType, { keyCode }) => {
        if (eventType !== 'keydown') {
            return;
        }
        if (keyCode === KEYS.VK_RETURN) {
            game.switchScreen('play'); 
        }
    },
};

module.exports = {
    startScreen,
};