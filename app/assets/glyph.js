function Glyph(char, foreground, background) {
    this.char = char || ' ';
    this.foreground = foreground || 'white';
    this.background = background || 'black';
}

module.exports = {
    Glyph,
};