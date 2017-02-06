function DarkOne(game, x, y) {
    Humanoid.call(this, game, x, y, "dayi");
    this.body.collideWorldBounds = true;
    this.nextCheckTime = 0;
    this.checkForEnemyFromSeconds = 1;
    this.attackDamage = 2;
};

DarkOne.prototype = Object.create(Humanoid.prototype);
DarkOne.prototype.constructor = DarkOne;

DarkOne.prototype.update = function () {
    Humanoid.prototype.update.call(this);

    //Check target. player or baci?
    if (this.game.time.now > this.nextCheckTime) {
        var player = this.game.world.getByName("Player");
        var baci = this.game.world.getByName("Bacı");
        var distance = Phaser.Point.distance(this.body.position, player.body.position);
        if (distance < 100) {
            this.target = player;
        } else {
            this.target = baci;
        }
        //change
        this.nextCheckTime = this.game.time.totalElapsedSeconds() + this.checkForEnemyFromSeconds * 1000;
    }


    if (this.target) {
        var distance = Phaser.Point.distance(this.body.position, this.target.body.position);
        if (distance < this.seekStopDistance) {
            this.velocityXBeforeAttack = this.body.velocity.x;
            this.velocityYBeforeAttack = this.body.velocity.y;
            this.isAttacking = true;
        } else {
            if (this.health < this.fleeMinHealth) {
                this.flee();
            } else {
                this.seek();
            }

        }

        if (!this.isAttacking) {
            //Check target. player or baci?
            if (this.game.time.now > this.nextHealthTime) {
                if (this.health < 100) {
                    this.health++;
                }
                this.nextHealthTime = this.game.time.totalElapsedSeconds() * 1000 + 2000;
                console.log(this.health);
            }
        }
    }
};

DarkOne.prototype.attack = function () {
    console.log("attacked");
    var self = this;

    if (self.target) {

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



            //looping through cordinats
            for (var i = Math.round(coords.length / 2); i < coords.length; i++) {

                //if a coordinat in that ray hits the enemy.
                if (self.target.body.hitTest(coords[i][0], coords[i][1])) {
                    enemyFound = true;
                    break;
                }
            }
            // if enemy found give damage and break the loops
            if (enemyFound) {
                this.target.damage(self.attackDamage);
                console.log("damage given by darkone");
            }

            if (enemyFound) {
                break;
            }
        }
    }
};