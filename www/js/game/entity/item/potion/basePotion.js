function BasePotion(game, name, x, y, texture,frame) {
    this.game = game;
    BaseItem.call(this, game, name, x, y, texture,frame);    


};

BasePotion.prototype = Object.create(BaseItem.prototype);
BasePotion.prototype.constructor = BasePotion;

BasePotion.prototype.update = function(){
    BaseItem.prototype.update.call(this);

};