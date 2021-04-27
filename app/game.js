const ROT = require('rot-js');

const Game = function(options = {}) {
    this.options = options;
    this.display = null;
    this.currentScreen = null;
    this.screenMap = {};
    this._init(options);
};

Game.prototype._init = function _init(options) {
    this.display = new ROT.Display(options);
    this._bindEventToScreen('keydown');
    this._bindEventToScreen('keyup');
    this._bindEventToScreen('keypress');
};

Game.prototype._bindEventToScreen = function _bindEventToScreen(eventType) {
    window.addEventListener(eventType, event => {
        if (!this.currentScreen) {
            return;
        }
        this.currentScreen.handleInput(this, eventType, event);
        this.display.clear();
        this.currentScreen.render(this);
    });
};

Game.prototype.render = function render(dom) {
    dom.appendChild(this.display.getContainer());
};

Game.prototype.registerScreens = function registerScreens(screenTuple = []) {
    screenTuple.forEach(([screnName, screen]) => {
        this.screenMap[screnName] = screen;
    });
};

Game.prototype.switchScreen = function switchScreen(screenName) {
    const screen = this.screenMap[screenName];
    if (!screen) {
        return null;
    }
    if (this.currentScreen !== null) {
        this.currentScreen.exit();
    }
    this.display.clear();
    this.currentScreen = screen;
    this.currentScreen.enter(this);
    this.currentScreen.render(this);
};

module.exports = {
    Game,
};