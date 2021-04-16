const { nullTile } = require('./tile');

function Map(tiles) {
    this.tiles = tiles;
    this.width = tiles.length;
    this.height = tiles[0].length;
}

Map.prototype.getTile = function getTile(x, y) {
    if (!this.tiles[x][y]) {
        return nullTile;
    }
    if (x < 0 || x >= this.width || y < 0 || y >= this.height || !this.tiles[x][y]) {
        return nullTile;
    }
    return this.tiles[x][y];
};

module.exports = {
    Map,
};