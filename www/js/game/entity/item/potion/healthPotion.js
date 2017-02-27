function HealthPotion(game, x, y) {
    this.game = game;
    BasePotion.call(this, game, "health potion", x, y, "items",16);
    game.add.existing(this);    


};

HealthPotion.prototype = Object.create(BasePotion.prototype);
HealthPotion.prototype.constructor = HealthPotion;

HealthPotion.prototype.update = function(){
    BasePotion.prototype.update.call(this);

};