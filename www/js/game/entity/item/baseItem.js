function BaseItem(game, name, x, y, texture, frame) {
    this.game = game;
    Phaser.Sprite.call(this, game, x, y, texture, frame);
    this.name = name;
    this.customComponents = {};

    var lootable = this.addCustomComponent(new Lootable());

};

BaseItem.prototype = Object.create(Phaser.Sprite.prototype);
BaseItem.prototype.constructor = BaseItem;

BaseItem.prototype.update = function () {

    Object.keys(this.customComponents).forEach(function (a, b, c) {
        this.customComponents[a].update();
    }, this);
};

BaseItem.prototype.getCustomComponent = function (componentName) {
    return this.customComponents[componentName];
};

BaseItem.prototype.addCustomComponent = function (comp) {
    this.customComponents[comp.name] = comp;    
    this.customComponents[comp.name].init(this.game,this);
    console.log("[" + this.name + "] :: added component " + comp.name);
}