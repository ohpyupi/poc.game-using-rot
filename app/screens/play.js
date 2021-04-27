const ROT = require('rot-js');
const { Map } = require('../assets/map');
const { nullTile, floorTile, wallTile } = require('../assets/tile');

const playScreen = {
    map: null,
    centerX: 0,
    centerY: 0,
    enter({ options }) {
        const totalIteration = 3;
        const { mapWidth, mapHeight } = options;
        const generator = new ROT.Map.Cellular(mapWidth, mapHeight);
        const tiles = [];
        for (let x = 0; x < mapWidth; x++) {
            tiles[x] = [];
            for (let y = 0; y < mapHeight; y++) {
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
    render({ display, options }) {
        const {
            screenWidth,
            screenHeight,
            mapWidth,
            mapHeight,
        } = options;
        let topLeftX = Math.max(0, this.centerX - (screenWidth / 2));
        topLeftX = Math.min(topLeftX, mapWidth - screenWidth);
        let topLeftY = Math.max(0, this.centerY - (screenHeight / 2));
        topLeftY = Math.min(topLeftY, mapHeight - screenHeight);
        for (let x = topLeftX; x <  topLeftX + screenWidth; x++) {
            for (let y = topLeftY; y < topLeftY + screenHeight; y++) {
                const { glyph: { char, foreground, background } } = this.map.getTile(x, y);
                display.draw(x - topLeftX, y - topLeftY, char, foreground, background);
            }
        }
        display.draw(this.centerX - topLeftX, this.centerY - topLeftY, '@', 'red', 'black');
    },
    handleInput(game, eventType, { keyCode }) {
        if (eventType !== 'keydown') {
            return;
        }
        if (keyCode === ROT.KEYS.VK_LEFT) {
            return this.move(-1, 0);
        }
        if (keyCode === ROT.KEYS.VK_RIGHT) {
            return this.move(1, 0);
        }
        if (keyCode === ROT.KEYS.VK_UP) {
            return this.move(0, -1);
        }
        if (keyCode === ROT.KEYS.VK_DOWN) {
            return this.move(0, 1);
        }
        /*
        if (keyCode === ROT.KEYS.VK_RETURN) {
            game.switchScreen('defeated'); 
        }
        */
    },
    move(dx, dy) {
        this.centerX = Math.max(0, Math.min(this.map.width - 1, this.centerX + dx));
        this.centerY = Math.max(0, Math.min(this.map.height - 1, this.centerY + dy))
    }
};

module.exports = {
    playScreen,
};