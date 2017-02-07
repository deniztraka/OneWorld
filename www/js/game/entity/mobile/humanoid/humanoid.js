function Humanoid(game, x, y, texture) {
    Mobile.call(this, game, x, y, texture);
        
}

Humanoid.prototype = Object.create(Mobile.prototype);
Humanoid.prototype.constructor = Humanoid;

Humanoid.prototype.update = function(){
      Mobile.prototype.update.call(this);
};

Humanoid.prototype.damage = function (value) {
    Mobile.prototype.damage.call(this,value);
    
    
};

Humanoid.prototype.kill = function () {
    Mobile.prototype.kill.call(this);
};