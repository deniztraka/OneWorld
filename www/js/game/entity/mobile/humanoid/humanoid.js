function Humanoid(game, x, y, texture) {
    Mobile.call(this, game, x, y, texture);
        
}

Humanoid.prototype = Object.create(Mobile.prototype);
Humanoid.prototype.constructor = Humanoid;

Humanoid.prototype.update = function(){
      Mobile.prototype.update.call(this);
};