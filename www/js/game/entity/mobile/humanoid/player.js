function Player(game, x, y) {
    Humanoid.call(this, game, x, y, "player");

    // this.body.setSize(32, 32, 15, 15);
    this.body.collideWorldBounds=true;
    

    //Creating UI
    // var bottomUI = game.add.sprite(this.game.width / 2, this.game.height - 135, 'bottomUI');
    // bottomUI.fixedToCamera = true;
    //bottomUI.anchor.setTo(0.5, 0.0);
    this.myHealthBar = new HealthBar(game, {
        x: 244,
        y: game.height - 17,
        width: 117,
        height: 15,
        bg: {
            color: '#2b2b2b'
        },
        bar: {
            color: '#6c0707'
        },
    });
    this.myHealthBar.setFixedToCamera(true);
   
    // Adding attack button
    var attackButton = game.add.button(this.game.width - 138, this.game.height - 130, 'button', function () {
        this.velocityXBeforeAttack = this.body.velocity.x;
        this.velocityYBeforeAttack = this.body.velocity.y;
        this.isAttacking = true;
    }, this, 2, 1, 0);
    attackButton.scale = new Phaser.Point(1.25,1.25);
    // Creating movement joystick
    this.joyStick = game.plugins.add(Phaser.Plugin.JoyStick);
    this.joyStick.create(75, this.game.height - 64);
    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    var leftUI = game.add.sprite(0, this.game.height - 130, 'leftUI');
    leftUI.fixedToCamera = true;
    leftUI.bringToTop();
    var rightUI = game.add.sprite(this.game.width - 321, this.game.height - 130, 'rightUI');
    rightUI.fixedToCamera = true;
    rightUI.bringToTop();

    
    this.movementKeys = {
        w:game.input.keyboard.addKey(Phaser.Keyboard.W),
        a:game.input.keyboard.addKey(Phaser.Keyboard.A),
        s:game.input.keyboard.addKey(Phaser.Keyboard.S),
        d:game.input.keyboard.addKey(Phaser.Keyboard.D)
    }
    

    
};

Player.prototype = Object.create(Humanoid.prototype);
Player.prototype.constructor = Player;

Player.prototype.damage = function (value) {
    Humanoid.prototype.damage.call(this,value);
    if(this.alive){
        this.myHealthBar.setPercent(this.health-value/100);
    }
};

Player.prototype.update = function () {
    Humanoid.prototype.update.call(this);

    if (!this.isAttacking) {
        //Movement input
        var joyStickCursors = this.joyStick.cursors;
        if (joyStickCursors.left || joyStickCursors.right || joyStickCursors.up || joyStickCursors.down) {
            this.body.velocity.x = -this.joyStick.speed.x;
            this.body.velocity.y = -this.joyStick.speed.y;
        }

        var keyboardCursors = this.game.input.keyboard.createCursorKeys();        
        if (keyboardCursors.up.isDown || this.movementKeys.w.isDown) {
            this.body.velocity.y = -this.movementSpeed;
        } else if (keyboardCursors.down.isDown || this.movementKeys.s.isDown) {
            this.body.velocity.y = this.movementSpeed;
        }
        if (keyboardCursors.left.isDown || this.movementKeys.a.isDown) {
            this.body.velocity.x = -this.movementSpeed;
        } else if (keyboardCursors.right.isDown || this.movementKeys.d.isDown) {
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