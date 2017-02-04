function Player(game, x, y) {
    Humanoid.call(this, game, x, y, "player");

    // this.body.setSize(32, 32, 15, 15);

    

    //Creating UI
    var bottomUI = game.add.sprite(this.game.width / 2, this.game.height - 135, 'bottomUI');
    bottomUI.fixedToCamera = true;
    bottomUI.anchor.setTo(0.5, 0.0);
    this.myHealthBar = new HealthBar(game, {
        x: 225,
        y: game.height - 50,
        width: 150,
        height: 25,
        bg: {
            color: '#2b2b2b'
        },
        bar: {
            color: '#6c0707'
        },
    });
    this.myHealthBar.setFixedToCamera(true);
    this.myEnergyBar = new HealthBar(game, {
        x: game.width - 225,
        y: game.height - 50,
        width: 150,
        height: 25,
        bg: {
            color: '#2b2b2b'
        },
        bar: {
            color: '#1a3451'
        },
        flipped: true
    });
    this.myEnergyBar.setFixedToCamera(true);
    this.myHealthBar.setPercent(50);
    this.myEnergyBar.setPercent(75);
    // Adding attack button
    var attackButton = game.add.button(this.game.width - 125, this.game.height - 125, 'button', function () {
        this.velocityXBeforeAttack = this.body.velocity.x;
        this.velocityYBeforeAttack = this.body.velocity.y;
        this.isAttacking = true;
    }, this, 2, 1, 0);
    // Creating movement joystick
    this.joyStick = game.plugins.add(Phaser.Plugin.JoyStick);
    this.joyStick.create(75, this.game.height - 75);
    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    var leftUI = game.add.sprite(0, this.game.height - 170, 'leftUI');
    leftUI.fixedToCamera = true;
    var rightUI = game.add.sprite(this.game.width - 321, this.game.height - 170, 'rightUI');
    rightUI.fixedToCamera = true;

    

    

    
};

Player.prototype = Object.create(Humanoid.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function () {
    Mobile.prototype.update.call(this);

    if (!this.isAttacking) {
        //Movement input
        var joyStickCursors = this.joyStick.cursors;
        if (joyStickCursors.left || joyStickCursors.right || joyStickCursors.up || joyStickCursors.down) {
            this.body.velocity.x = -this.joyStick.speed.x;
            this.body.velocity.y = -this.joyStick.speed.y;
        }

        var keyboardCursors = this.game.input.keyboard.createCursorKeys();
        if (keyboardCursors.up.isDown) {
            this.body.velocity.y = -this.movementSpeed;
        } else if (keyboardCursors.down.isDown) {
            this.body.velocity.y = this.movementSpeed;
        }
        if (keyboardCursors.left.isDown) {
            this.body.velocity.x = -this.movementSpeed;
        } else if (keyboardCursors.right.isDown) {
            this.body.velocity.x = this.movementSpeed;
        }

        if (this.spaceKey.isDown) {
            this.velocityXBeforeAttack = this.body.velocity.x;
            this.velocityYBeforeAttack = this.body.velocity.y;
            this.isAttacking = true;
        }
    }
    //console.log(Math.atan2(this.body.velocity.y,this.body.velocity.x) * (180 / Math.PI));
};