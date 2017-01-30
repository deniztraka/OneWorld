function Player(game, x, y) {
    Humanoid.call(this, game, x, y, "player");

    
    
    // Player Input Staff
    this.joyStick = game.plugins.add(Phaser.Plugin.JoyStick);
    this.joyStick.create(75, this.game.height - 75);
    var actionOnlicked = function (player, hodo) {
        player.attacking = true;
    }
    var button = game.add.button(this.game.width - 125, this.game.height - 125, 'button', function () {
        actionOnlicked(this);
    }, this, 2, 1, 0);
};

Player.prototype = Object.create(Humanoid.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function () {
    Mobile.prototype.update.call(this);
    var self = this;
    this.body.velocity.set(0);

    // Retrieve the cursors value
    var cursors = this.joyStick.cursors;

    if (cursors.left || cursors.right || cursors.up || cursors.down) {
        if(!this.attacking){
            this.body.velocity.x = -this.joyStick.speed.x * this.speed;
            this.body.velocity.y = -this.joyStick.speed.y * this.speed;
            this.directionDegree = this.joyStick.angleFromDegrees;
        }
    } else if (!this.attacking) {
        this.animations.stop();
    }

    //console.log(this.joyStick.speed.x + " " + this.joyStick.speed.y);

    

    if (!this.attacking) {
        if (!this.directionDegree) {
            this.play("up");
        } else if (this.directionDegree > -120 && this.directionDegree < -60) {
            this.play("up");
        } else if (this.directionDegree > -60 && this.directionDegree < 60) {
            this.play("right");
        } else if (this.directionDegree > 60 && this.directionDegree < 120) {
            this.play("down");
        } else {
            this.play("left");
        }
    } else {
        if (this.directionDegree > -120 && this.directionDegree < -60) {
            this.play("upSlash");
        } else if (this.directionDegree > -60 && this.directionDegree < 60) {
            this.play("rightSlash");
        } else if (this.directionDegree > 60 && this.directionDegree < 120) {
            this.play("downSlash");
        } else {
            this.play("leftSlash");
        }        

        this.animations.currentAnim.onComplete.add(function () {
            self.attacking = false;
        }, this);

    }
};