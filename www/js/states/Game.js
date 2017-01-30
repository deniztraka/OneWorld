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
    this.debugMode = false;
    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};
BasicGame.Game.prototype = {

    create: function () {

        //	Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        new Player(this.game, 250, 250);

        new Skeleton(this.game, 350,350);
        
    },

    update: function () {
        //	Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!        

    },

    render: function () {
        if (this.debugMode) {
            //down left joystick area render
            this.game.debug.geom(new Phaser.Rectangle(0, this.game.height / 2, this.game.width / 3, this.game.height / 2), 'rgba(255,0,0,0.5)');
        }
    },

    quitGame: function (pointer) {

        //	Here you should destroy anything you no longer need.
        //	Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //	Then let's go back to the main menu.
        this.state.start('MainMenu');

    }

};