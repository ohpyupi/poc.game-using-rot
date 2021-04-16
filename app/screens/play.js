const ROT = require('rot-js');
const { Map } = require('../assets/map');
const { nullTile, floorTile, wallTile } = require('../assets/tile');

const playScreen = {
    map: null,
    enter({ display }) {
        const totalIteration = 3;
        const { width, height } = display.getOptions();
        const generator = new ROT.Map.Cellular(width, height);
        const tiles = [];
        for (let x = 0; x < width; x++) {
            tiles[x] = [];
            for (let y = 0; y < height; y++) {
                tiles[x][y] = nullTile;
            }
        }
        generator.randomize(0.5);
        for (let i = 0; i < totalIteration; i++) {
            generator.create();
        }
        generator.create((x, y, v) => {
            tiles[x][y] = v === 1 ? floorTile : wallTile;
        });
        this.map = new Map(tiles);
    },
    exit: () => {},
    render({ display }) {
        for (let x = 0; x < this.map.width; x++) {
            for (let y = 0; y < this.map.height; y++) {
                const { glyph: { char, foreground, background } } = this.map.getTile(x, y);
                display.draw(x, y, char, foreground, background);
            }
        }
    },
    handleInput: (game, eventType, { keyCode }) => {
        if (eventType !== 'keydown') {
            return;
        }
        if (keyCode === ROT.KEYS.VK_RETURN) {
            game.switchScreen('defeated'); 
        }
    },
};

module.exports = {
    playScreen,
};