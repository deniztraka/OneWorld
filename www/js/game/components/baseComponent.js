function BaseComponent() {
    // Reduce conflicts
    var self = this;

    // Name
    self.name = "";
    // Target
    self.target = null;

};

BaseComponent.prototype = {};

//do initialization here
BaseComponent.prototype.init = function (game, target) {
    this.game = game;
    this.target = target;
};

//update logic
BaseComponent.prototype.update = function () {

};