const { Glyph } = require('./glyph');

function Tile(glyph) {
    this.glyph = glyph;
}

const nullTile = new Tile(new Glyph());
const floorTile = new Tile(new Glyph('.'));
const wallTile = new Tile(new Glyph('#'));

module.exports = {
    Tile,
    nullTile,
    floorTile,
    wallTile,
};