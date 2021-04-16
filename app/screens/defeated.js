const { KEYS } = require('rot-js');

const defeatedScreen = {
    enter: () => {},
    exit: () => {},
    render: ({ display }) => {
        display.drawText(5, 2, 'Defeated page');
    },
    handleInput: (game, eventType, { keyCode }) => {
        if (eventType !== 'keydown') {
            return;
        }
        if (keyCode === KEYS.VK_RETURN) {
            game.switchScreen('start'); 
        }
    },
};

module.exports = {
    defeatedScreen,
};