function Skeleton(game, x, y) {
    Undead.call(this, game, x, y, "skeleton");
        
}

Skeleton.prototype = Object.create(Undead.prototype);
Skeleton.prototype.constructor = Skeleton;

Skeleton.prototype.update = function () {
    Undead.prototype.update.call(this);
     
     //this.isAttacking = true;
};