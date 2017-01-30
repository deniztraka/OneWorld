function Mobile(game, x, y, texture) {
    this.game = game;
    Phaser.Sprite.call(this, game, x, y, texture);
    game.add.existing(this);
    this.anchor.setTo(0.5, 0.5);
    game.physics.enable(this, Phaser.Physics.ARCADE);

    this.animations.add('up', [8 * 13, 8 * 13 + 1, 8 * 13 + 2, 8 * 13 + 3, 8 * 13 + 4, 8 * 13 + 5, 8 * 13 + 6, 8 * 13 + 7, 8 * 13 + 8], 10, true);
    this.animations.add('left', [9 * 13, 9 * 13 + 1, 9 * 13 + 2, 9 * 13 + 3, 9 * 13 + 4, 9 * 13 + 5, 9 * 13 + 6, 9 * 13 + 7, 9 * 13 + 8], 10, true);
    this.animations.add('down', [10 * 13, 10 * 13 + 1, 10 * 13 + 2, 10 * 13 + 3, 10 * 13 + 4, 10 * 13 + 5, 10 * 13 + 6, 10 * 13 + 7, 10 * 13 + 8], 10, true);
    this.animations.add('right', [11 * 13, 11 * 13 + 1, 11 * 13 + 2, 11 * 13 + 3, 11 * 13 + 4, 11 * 13 + 5, 11 * 13 + 6, 11 * 13 + 7, 11 * 13 + 8], 10, true);

    this.animations.add('upSlash', [12 * 13, 12 * 13 + 1, 12 * 13 + 2, 12 * 13 + 3, 12 * 13 + 4, 12 * 13 + 5], 10, false);
    this.animations.add('leftSlash', [13 * 13, 13 * 13 + 1, 13 * 13 + 2, 13 * 13 + 3, 13 * 13 + 4, 13 * 13 + 5], 10, false);
    this.animations.add('downSlash', [14 * 13, 14 * 13 + 1, 14 * 13 + 2, 14 * 13 + 3, 14 * 13 + 4, 14 * 13 + 5], 10, false);
    this.animations.add('rightSlash', [15 * 13, 15 * 13 + 1, 15 * 13 + 2, 15 * 13 + 3, 15 * 13 + 4, 15 * 13 + 5], 10, false);

    this.speed = 1;
    this.directionDegree = 0;
    this.attacking = false;
}

Mobile.prototype = Object.create(Phaser.Sprite.prototype);
Mobile.prototype.constructor = Mobile;

Mobile.prototype.update = function () {
    var self = this;
    if (!this.attacking) {
        this.directionDegree = this.body.angle * 180 / Math.PI;
    }

    
    //console.log(-Math.atan2(this.body.velocity.y/this.body.velocity.x)* 180 / Math.PI);
};