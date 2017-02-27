function Lootable() {
    BaseComponent.call(this);
    // Reduce conflicts
    var self = this;

    // Name
    self.name = "Lootable";
    // Target
    self.target = null;

};

Lootable.prototype = Object.create(BaseComponent.prototype);
Lootable.prototype.constructor = Lootable;

//do initialization here
Lootable.prototype.init = function (game, t) {
    BaseComponent.prototype.init.call(this, game, t);

    this.target.inputEnabled = true;

    this.target.events.onInputDown.add(this.onDown, this);
};

//update logic
Lootable.prototype.onDown = function () {    
    console.log(this.target.name + " onDown.");
    var player = this.game.entityGroup.getByName("Player");    
    this.target.pickedUp = true;
    player.inventory.push(this.target);
    this.target.kill();
};

//update logic
Lootable.prototype.update = function () {
    BaseComponent.prototype.update.call(this);

    //console.log("lootable update");
};

