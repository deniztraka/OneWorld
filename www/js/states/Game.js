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
    this.enemy;

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
        this.debugMode = false;
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

        if (map.objects.mobiles) {
            var mobiles = map.objects.mobiles;
            mobiles.forEach(function (object) {
                if (object.type == "dayi") {
                    var dayi = new DarkOne(self.game, object.x, object.y);
                    self.game.entityGroup.add(dayi);
                } else if (object.type == "player") {
                    self.player = new Player(self.game, object.x, object.y);
                    self.game.entityGroup.add(self.player);
                } else if (object.type == "baci") {
                    self.baci = new Baci(self.game, object.x, object.y);
                    self.baci.target = self.player;
                    self.game.entityGroup.add(self.baci);
                }
            });
        }

        var healthPotion = new HealthPotion(this.game, 100, 100);
        this.game.entityGroup.add(healthPotion);



        this.foregroundLayer = map.createLayer("foregroundLayer");
        this.collisionLayer = map.createLayer("collision");
        this.collisionLayer.renderable = false;
        this.collisionLayer.debug = true;
        map.setCollision(79, true, "collision");

        this.game.world.setBounds(0, 0, 3200, 3200);
        this.floorLayer.resizeWorld();

        this.baci.createUI();
        this.player.createUI();


        var edge = 100;
        this.cameraDeadzone = new Phaser.Rectangle(edge, edge, this.game.camera.width - (edge * 2), this.game.camera.height - (edge * 2));
        this.game.camera.focusOn(this.player);
        if (this.game.device.desktop) {
            // Only autofollow if we're on desktop.
            this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
        }
    },

    update: function () {
        if (!this.game.device.desktop) {
            var cam = this.game.camera;
            var player = this.player;

            var hEdge = player.x - cam.x;
            var vEdge = player.y - cam.y;

            if (hEdge < this.cameraDeadzone.left || hEdge > this.cameraDeadzone.right || vEdge < this.cameraDeadzone.top || vEdge > this.cameraDeadzone.bottom) {
                var camCenter = {
                    x: cam.x + (cam.width / 2),
                    y: cam.y + (cam.height / 2)
                };
                var diff = Phaser.Point.subtract(player, camCenter);
                cam.x += diff.x * 1.8;
                cam.y += diff.y * 1.8;
            }
        }

        //collision
        this.game.physics.arcade.collide(this.game.entityGroup);
        this.game.physics.arcade.collide(this.game.entityGroup, this.collisionLayer);
        this.game.entityGroup.sort('y', Phaser.Group.SORT_ASCENDING);
    },

    render: function () {
        this.game.debug.text(this.game.time.fps || '--', 2, 14, "#a7aebe");
        if (this.debugMode) {
            // game.debug.body(this.player);
            // if (this.enemy) {

            //     if (this.enemy.lines) {
            //         for (var i = 0; i < this.enemy.lines.length; i++) {
            //             this.game.debug.geom(this.enemy.lines[i]);
            //         }
            //     }
            //     // this.game.debug.spriteBounds(this.player);
            //     // this.game.debug.spriteInfo(this.player, 32, 32);
            //     // game.debug.geom( player.debugRectangle, 'rgba(255,0,0,0.25)' ) ;
            // }
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