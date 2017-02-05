function Baci(game, x, y) {
    Humanoid.call(this, game, x, y, "baci");

   
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
        flipped: true
    });
    this.myHealthBar.setFixedToCamera(true);
};

Baci.prototype = Object.create(Humanoid.prototype);
Baci.prototype.constructor = Baci;

Baci.prototype.update = function () {
    Humanoid.prototype.update.call(this);

    
};

Baci.prototype.damage = function (value) {
    Humanoid.prototype.damage.call(this,value);
    if(this.alive){
        this.myHealthBar.setPercent(this.health-value/100);
    }
};

Baci.prototype.kill = function (value) {
    //Finish game here
};