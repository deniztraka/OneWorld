function Undead(game, x, y, texture) {
    Mobile.call(this, game, x, y, texture);
        
}

Undead.prototype = Object.create(Mobile.prototype);
Undead.prototype.constructor = Undead;

Undead.prototype.update = function(){
      
};