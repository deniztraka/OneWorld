BasicGame.Game = function (game) {

    //	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game; //	a reference to the currently running game
    this.add; //	used to add sprites, text, groups, etc
    this.camera; //	a reference to the game camera
    this.cache; //	the game cache
    this.input; //	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load; //	for preloading assets
    this.math; //	lots of useful common math operations
    this.sound; //	the sound manager - add a sound, play one, set-up markers, etc
    this.stage; //	the game stage
    this.time; //	the clock
    this.tweens; //  the tween manager
    this.state; //	the state manager
    this.world; //	the game world
    this.particles; //	the particle manager
    this.physics; //	the physics manager
    this.rnd; //	the repeatable random number generator
    this.debugMode;
    this.bg;
    this.baci;
    this.player;

    this.floorLayer;
    this.dirtLayer;
    this.backgroundOverlayLayer;
    this.foregroundLayer;
    this.collisionLayer;
    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.
};

BasicGame.Game.prototype = {

    create: function () {
        this.game.time.advancedTiming = true;

        var self = this;
        this.debugMode = true;
        var map = this.game.add.tilemap('map');

        map.addTilesetImage('grass');
        map.addTilesetImage('treetop');
        map.addTilesetImage('trunk');
        map.addTilesetImage('block');
        map.addTilesetImage('dirt');
        map.addTilesetImage('barrel');
        map.addTilesetImage('buckets');
        this.floorLayer = map.createLayer("floorLayer");
        this.dirtLayer = map.createLayer("dirtLayer");
        this.backgroundOverlayLayer = map.createLayer("backgroundOverlay");       

        this.game.entityGroup = this.game.add.group();
        
        this.player = new Player(this.game, this.game.width / 2, this.game.height / 2);        
        this.baci = new Baci(this.game, this.game.width / 2, this.game.height - 75);        
        this.baci.target = this.player;

        self.game.entityGroup.add(this.player);
        self.game.entityGroup.add(this.baci);

        game.time.events.repeat(Phaser.Timer.SECOND * 1, 10, function () {
            var darkOne = new DarkOne(self.game, self.rnd.integerInRange(0, self.game.width), 10);
            self.game.entityGroup.add(darkOne);
            darkOne.target = self.player;
        }, this);

        this.foregroundLayer = map.createLayer("foregroundLayer");
        this.collisionLayer = map.createLayer("collision");
        this.collisionLayer.renderable = false;
        this.collisionLayer.debug = true;
        map.setCollision(79, true, "collision");

        this.game.world.setBounds(0, 0, 3200, 3200);        
        this.floorLayer.resizeWorld();

        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

        this.baci.createUI();
        this.player.createUI();
    },

    update: function () {
        //collision
        this.game.physics.arcade.collide(this.game.entityGroup);
        this.game.physics.arcade.collide(this.game.entityGroup, this.collisionLayer);
        this.game.entityGroup.sort('y', Phaser.Group.SORT_ASCENDING);
    },

    render: function () {
        if (this.debugMode) {
            this.game.debug.text(this.game.time.fps || '--', 2, 14, "#a7aebe");

            if (this.player) {

                if (this.player.lines) {
                    for (var i = 0; i < this.player.lines.length; i++) {
                        this.game.debug.geom(this.player.lines[i]);
                    }
                }
                // this.game.debug.spriteBounds(this.player);
                // this.game.debug.spriteInfo(this.player, 32, 32);
                // game.debug.geom( player.debugRectangle, 'rgba(255,0,0,0.25)' ) ;
            }
        }
    },

    quitGame: function (pointer) {

        //	Here you should destroy anything you no longer need.
        //	Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //	Then let's go back to the main menu.
        this.state.start('MainMenu');

    },
    resize: function (width, height) {

    }

};