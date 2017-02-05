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
    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

BasicGame.Game.prototype = {

    create: function () {
        this.debugMode = false;
        var map = this.game.add.tilemap('map');

        map.addTilesetImage('grass');
        map.createLayer("floorLayer");
        //this.bg = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'dirt');

        this.game.enemyGroup = this.game.add.group();
        //	Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        this.player = new Player(this.game, this.game.width/2, this.game.height/2);
        // skeleton = new Skeleton(this.game, 280, 280);
        this.baci = new Baci(this.game,this.game.width/2, this.game.height-75);
        // this.game.enemyGroup.add(skeleton);

        	
    },

    update: function () {
        //	Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!        
        
    },

    render: function () {
        if (this.debugMode) {
            if (skeleton) {
                this.game.debug.geom(skeleton.line);
                //this.game.debug.spriteBounds(skeleton);                
                //game.debug.geom( skeleton.debugRectangle, 'rgba(255,0,0,0.25)' ) ;
            }
            if (this.player) {
                //this.game.debug.geom(player.line);
                if (this.player.lines) {
                    for (var i = 0; i < this.player.lines.length; i++) {
                        this.game.debug.geom(this.player.lines[i]);
                    }
                }
                //this.game.debug.spriteBounds(player);
                this.game.debug.spriteInfo(this.player, 32, 32);
                //game.debug.geom( player.debugRectangle, 'rgba(255,0,0,0.25)' ) ;
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

		//	If the game container is resized this function will be called automatically.
		//	You can use it to align sprites that should be fixed in place and other responsive display things.

		// this.bg.width = width;
		// this.bg.height = height;


	}

};