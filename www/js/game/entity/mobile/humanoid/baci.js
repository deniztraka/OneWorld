function Baci(game, x, y) {
    Humanoid.call(this, game, x, y, "baci");
    this.name = "Bacı";
    this.lastSpeechTime = 0;
    this.standPosX = x;
    this.standPosY = y;
    this.body.velocity.x = 10;

    this.myHealthBar = new HealthBar(game, {
        x: game.width - 245,
        y: game.height - 17,
        width: 115,
        height: 15,
        bg: {
            color: '#2b2b2b'
        },
        bar: {
            color: '#6c0707'
        },
        flipped: true,
        drawText: true,
        maxHealth: this.maxHealth
    });
    this.myHealthBar.setFixedToCamera(true);
};

Baci.prototype = Object.create(Humanoid.prototype);
Baci.prototype.constructor = Baci;

Baci.prototype.update = function () {
    Humanoid.prototype.update.call(this);
    // this.body.position.x = this.standPosX;
    // this.body.position.x = this.standPosY;

    if (Math.random() < 0.01 && this.lastSpeechTime + 3000 < this.game.time.now) {
        this.say("imdak!");

        this.lastSpeechTime = this.game.time.now;
    }

    if (this.target) {
        this.seek();
    }

    
};

Baci.prototype.damage = function (value) {
    Humanoid.prototype.damage.call(this, value);
    if (this.alive) {
        this.myHealthBar.setPercent(this.health - value / 100);
    }
};

Baci.prototype.kill = function (value) {
    Humanoid.prototype.kill.call(this, value);
};