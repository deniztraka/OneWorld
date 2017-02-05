function DarkOne(game, x, y) {
    Humanoid.call(this, game, x, y, "dayi");

   
    
};

DarkOne.prototype = Object.create(Humanoid.prototype);
DarkOne.prototype.constructor = DarkOne;

DarkOne.prototype.update = function () {
    Humanoid.prototype.update.call(this);

    
};