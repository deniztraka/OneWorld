function Mobile(game, x, y, texture) {
    this.game = game;
    Phaser.Sprite.call(this, game, x, y, texture);
    game.add.existing(this);
    game.physics.enable(this, Phaser.Physics.ARCADE);

    this.body.setSize(36, 55, 15, 17);
    this.anchor.setTo(0.5, 0.5);

    this.animations.add('up', [8 * 13, 8 * 13 + 1, 8 * 13 + 2, 8 * 13 + 3, 8 * 13 + 4, 8 * 13 + 5, 8 * 13 + 6, 8 * 13 + 7, 8 * 13 + 8], 10, true);
    this.animations.add('left', [9 * 13, 9 * 13 + 1, 9 * 13 + 2, 9 * 13 + 3, 9 * 13 + 4, 9 * 13 + 5, 9 * 13 + 6, 9 * 13 + 7, 9 * 13 + 8], 10, true);
    this.animations.add('down', [10 * 13, 10 * 13 + 1, 10 * 13 + 2, 10 * 13 + 3, 10 * 13 + 4, 10 * 13 + 5, 10 * 13 + 6, 10 * 13 + 7, 10 * 13 + 8], 10, true);
    this.animations.add('right', [11 * 13, 11 * 13 + 1, 11 * 13 + 2, 11 * 13 + 3, 11 * 13 + 4, 11 * 13 + 5, 11 * 13 + 6, 11 * 13 + 7, 11 * 13 + 8], 10, true);

    this.animations.add('upSlash', [12 * 13, 12 * 13 + 1, 12 * 13 + 2, 12 * 13 + 3, 12 * 13 + 4, 12 * 13 + 5], 10, false);
    this.animations.add('leftSlash', [13 * 13, 13 * 13 + 1, 13 * 13 + 2, 13 * 13 + 3, 13 * 13 + 4, 13 * 13 + 5], 10, false);
    this.animations.add('downSlash', [14 * 13, 14 * 13 + 1, 14 * 13 + 2, 14 * 13 + 3, 14 * 13 + 4, 14 * 13 + 5], 10, false);
    this.animations.add('rightSlash', [15 * 13, 15 * 13 + 1, 15 * 13 + 2, 15 * 13 + 3, 15 * 13 + 4, 15 * 13 + 5], 10, false);

    this.animations.add('die', [20 * 13, 20 * 13 + 1, 20 * 13 + 2, 20 * 13 + 3, 20 * 13 + 4, 20 * 13 + 5], 10, false);

    this.movementSpeed = 45;
    this.health = 100;
    this.directionDegree = 0;
    this.isAttacking = false;
    this.isAttackedOnce = false;
    this.attackDistance = 30;
    this.attackDamage = 10;
    this.lines = new Array(3);
    this.velocityXBeforeAttack = 0;
    this.velocityYBeforeAttack = 0;

    this.target = null;
    this.seekSlowingDistance = 100;
    this.seekStopDistance = 30;
    this.fleeMinHealth = 10;
}

Mobile.prototype = Object.create(Phaser.Sprite.prototype);
Mobile.prototype.constructor = Mobile;

Mobile.prototype.attack = function () {
    console.log("attacked");
    var self = this;

    //fireing 3 rays according to direction
    if (this.directionDegree > -120 && this.directionDegree < -60) {
        //this.play("upSlash");
        console.log("upSlash");
        for (var i = 0; i < this.lines.length; i++) {
            if (i == 0) {
                this.lines[i] = new Phaser.Line(this.position.x, this.position.y + 10, this.position.x - 15, this.position.y - this.attackDistance + 10);
            } else
            if (i == 1) {
                this.lines[i] = new Phaser.Line(this.position.x, this.position.y + 10, this.position.x, this.position.y - this.attackDistance + 10);
            } else
            if (i == 2) {
                this.lines[i] = new Phaser.Line(this.position.x, this.position.y + 10, this.position.x + 15, this.position.y - this.attackDistance + 10);
            }
        }
        //this.line = new Phaser.Line(this.position.x, this.position.y, this.position.x, this.position.y - this.attackDistance);
    } else if (this.directionDegree > -60 && this.directionDegree < 60) {
        console.log("rightSlash");
        for (var i = 0; i < this.lines.length; i++) {
            if (i == 0) {
                this.lines[i] = new Phaser.Line(this.position.x, this.position.y + 10, this.position.x + this.attackDistance, this.position.y - 15 + 10);
            } else
            if (i == 1) {
                this.lines[i] = new Phaser.Line(this.position.x, this.position.y + 10, this.position.x + this.attackDistance, this.position.y + 10);
            } else
            if (i == 2) {
                this.lines[i] = new Phaser.Line(this.position.x, this.position.y + 10, this.position.x + this.attackDistance, this.position.y + 15 + 10);
            }
        }
    } else if (this.directionDegree > 60 && this.directionDegree < 120) {
        console.log("downSlash");
        for (var i = 0; i < this.lines.length; i++) {
            if (i == 0) {
                this.lines[i] = new Phaser.Line(this.position.x, this.position.y + 10, this.position.x - 15, this.position.y + this.attackDistance + 10);
            } else
            if (i == 1) {
                this.lines[i] = new Phaser.Line(this.position.x, this.position.y + 10, this.position.x, this.position.y + this.attackDistance + 10);
            } else
            if (i == 2) {
                this.lines[i] = new Phaser.Line(this.position.x, this.position.y + 10, this.position.x + 15, this.position.y + this.attackDistance + 10);
            }
        }
    } else {
        console.log("leftSlash");
        for (var i = 0; i < this.lines.length; i++) {
            if (i == 0) {
                this.lines[i] = new Phaser.Line(this.position.x, this.position.y + 10, this.position.x - this.attackDistance, this.position.y - 15 + 10);
            } else
            if (i == 1) {
                this.lines[i] = new Phaser.Line(this.position.x, this.position.y + 10, this.position.x - this.attackDistance, this.position.y + 10);
            } else
            if (i == 2) {
                this.lines[i] = new Phaser.Line(this.position.x, this.position.y + 10, this.position.x - this.attackDistance, this.position.y + 15 + 10);
            }
        }
    }

    //Looping each rays
    var enemyFound = false;
    for (var i = 0; i < this.lines.length; i++) {
        //get ray coordinats
        var coords = this.lines[i].coordinatesOnLine();

        var damageGiven = false;
        //looping through every enemy in the game
        this.game.enemyGroup.forEachAlive(function (enemy) {

            if (!damageGiven) {
                //looping through cordinats
                for (var i = Math.round(coords.length / 2); i < coords.length; i++) {

                    //if a coordinat in that ray hits the enemy.
                    if (enemy.body.hitTest(coords[i][0], coords[i][1])) {
                        enemyFound = true;
                        break;
                    }
                }
                // if enemy found give damage and break the loops
                if (enemyFound) {
                    enemy.damage(self.attackDamage);
                    enemy.tint = Math.random() * 0xffffff;
                    console.log("damage given");
                    damageGiven = true;
                }
            }
        });
        if (enemyFound) {
            break;
        }
    }
}

Mobile.prototype.damage = function (value) {
    Phaser.Sprite.prototype.damage.call(this, value);


};

Mobile.prototype.kill = function () {
    var self = this;
    this.alive = false;
    this.body.velocity.setTo(0, 0);
    this.animations.stop();
    this.animations.play('die');
    this.animations.currentAnim.onComplete.addOnce(function () {
        self.inputEnabled = false;
        if (self.input) {
            self.input.useHandCursor = false;
        }
        self.events.destroy();
        Phaser.Sprite.prototype.kill.call(self);
    }, this);
};

Mobile.prototype.update = function () {
    var self = this;

    if (!this.alive) {
        return;
    }



    //Movement, animation according to movement direction/angle or attacking mode
    if (!this.isAttacking) {
        this.directionDegree = this.body.angle * 180 / Math.PI;
        if (this.body.speed == 0) {
            this.animations.stop();
        }
    }

    if (!this.isAttacking) {
        if (this.directionDegree > -120 && this.directionDegree < -60) {
            this.play("up");
        } else if (this.directionDegree > -60 && this.directionDegree < 60) {
            this.play("right");
        } else if (this.directionDegree > 60 && this.directionDegree < 120) {
            this.play("down");
        } else {
            this.play("left");
        }
    } else if (!this.isAttackedOnce) {

        if (this.directionDegree > -120 && this.directionDegree < -60) {
            this.play("upSlash");
        } else if (this.directionDegree > -60 && this.directionDegree < 60) {
            this.play("rightSlash");
        } else if (this.directionDegree > 60 && this.directionDegree < 120) {
            this.play("downSlash");
        } else {
            this.play("leftSlash");
        }
        this.isAttackedOnce = true;
        this.animations.currentAnim.onComplete.addOnce(function () {
            self.attack();
            self.isAttacking = false;
            self.isAttackedOnce = false;
        }, this);
    }



    this.body.velocity.set(0);
};

Mobile.prototype.seek = function () {
    if (this.target) {        

        var velocity = Phaser.Point.normalize(Phaser.Point.subtract(this.target.body.position, this.body.position));


        var distance = Phaser.Point.distance(this.body.position, this.target.body.position);
        if (distance < this.seekSlowingDistance && distance > this.seekStopDistance) {
            velocity.x = velocity.x * this.movementSpeed * (distance / 100);
            velocity.y = velocity.y * this.movementSpeed * (distance / 100);
        } else if (distance < this.seekStopDistance) {
            velocity.x = 0;
            velocity.y = 0;
        } else {
            velocity.x = velocity.x * this.movementSpeed;
            velocity.y = velocity.y * this.movementSpeed;
        }
        var desiredVelocity = velocity;

        // var steering = Phaser.Point.subtract(desiredVelocity, this.body.velocity);
        // var resultingVelocity = Phaser.Point.add(desiredVelocity, steering);
        // var normalizedResultingVelocity = Phaser.Point.normalize(resultingVelocity);
        // resultingVelocity.x = normalizedResultingVelocity.x * this.movementSpeed;
        // resultingVelocity.y = normalizedResultingVelocity.y * this.movementSpeed;
        //this.body.velocity = resultingVelocity;
        this.body.velocity = velocity;
    }

};

Mobile.prototype.flee = function () {
    if (this.target) {
        var velocity = Phaser.Point.normalize(Phaser.Point.subtract(this.target.body.position, this.body.position));
        velocity.x = velocity.x * this.movementSpeed;
        velocity.y = velocity.y * this.movementSpeed;
        var desiredVelocity = velocity;
        desiredVelocity.x = -desiredVelocity.x;
        desiredVelocity.y = -desiredVelocity.y;

        // var steering = Phaser.Point.subtract(desiredVelocity, this.body.velocity);
        // var resultingVelocity = Phaser.Point.add(desiredVelocity, steering);
        // var normalizedResultingVelocity = Phaser.Point.normalize(resultingVelocity);
        // resultingVelocity.x = normalizedResultingVelocity.x * this.movementSpeed;
        // resultingVelocity.y = normalizedResultingVelocity.y * this.movementSpeed;
        // this.body.velocity = resultingVelocity;
        this.body.velocity = desiredVelocity;
    }
};