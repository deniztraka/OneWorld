var Components = Components || {};

Components.InputManager = Components.InputManager || function (game) {
	// Reduce conflicts
	var self = this;
	self.game = game;

	// Name
	self.name = "InputManager";

	// Target
	self.target = null;


	// -------------------------
	// Properties
	// -------------------------
	this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

	this.movementKeys = {
		w: game.input.keyboard.addKey(Phaser.Keyboard.W),
		a: game.input.keyboard.addKey(Phaser.Keyboard.A),
		s: game.input.keyboard.addKey(Phaser.Keyboard.S),
		d: game.input.keyboard.addKey(Phaser.Keyboard.D)
	}

	// Creating movement joystick
	this.joyStick = game.plugins.add(Phaser.Plugin.JoyStick);
	this.joyStick.create(75, this.game.height - 64);

	// Adding attack button
	var attackButton = game.add.button(this.game.width - 138, this.game.height - 130, 'button', function () {
		self.target.velocityXBeforeAttack = self.target.body.velocity.x;
		self.target.velocityYBeforeAttack = self.target.body.velocity.y;
		self.target.isAttacking = true;
	}, this, 2, 1, 0);
	attackButton.scale = new Phaser.Point(1.25, 1.25);
	attackButton.fixedToCamera = true;

	var stopButton = game.add.button(this.game.width - 225, this.game.height - 65, 'stop', function () {
		var baci = self.game.entityGroup.getByName("Bacı");
		if (baci.inCamera) {
			baci.target = null;
			followButton.visible = true;
			stopButton.visible = false;
			self.target.say("Wait here !");
		} else {
			self.target.say("She can not here me!");
		}
	}, this);
	stopButton.fixedToCamera = true;

	var followButton = game.add.button(this.game.width - 225, this.game.height - 65, 'follow', function () {
		var baci = self.game.entityGroup.getByName("Bacı");
		if (baci.inCamera) {
			baci.target = this.target;
			stopButton.visible = true;
			followButton.visible = false;
			self.target.say("Come to me lady!");
		} else {
			self.target.say("She can not here me!");
		}
	}, this);
	followButton.fixedToCamera = true;
	followButton.visible = false;


	// -------------------------
	// Events
	// -------------------------


	// -------------------------
	// Methods
	// -------------------------
	self.setTarget = function (t) {
		self.target = t;
	}

	self.update = function () {

		if (!this.target.isAttacking) {
			//Movement input
			var joyStickCursors = this.joyStick.cursors;
			if (joyStickCursors.left || joyStickCursors.right || joyStickCursors.up || joyStickCursors.down) {
				this.target.body.velocity.x = -this.joyStick.speed.x;
				this.target.body.velocity.y = -this.joyStick.speed.y;
			}

			var keyboardCursors = this.game.input.keyboard.createCursorKeys();
			if (keyboardCursors.up.isDown || this.movementKeys.w.isDown) {
				this.target.body.velocity.y = -this.target.movementSpeed;
			} else if (keyboardCursors.down.isDown || this.movementKeys.s.isDown) {
				this.target.body.velocity.y = this.target.movementSpeed;
			}
			if (keyboardCursors.left.isDown || this.movementKeys.a.isDown) {
				this.target.body.velocity.x = -this.target.movementSpeed;
			} else if (keyboardCursors.right.isDown || this.movementKeys.d.isDown) {
				this.target.body.velocity.x = this.target.movementSpeed;
			}

			if (this.spaceKey.isDown) {
				this.target.velocityXBeforeAttack = this.target.body.velocity.x;
				this.target.velocityYBeforeAttack = this.target.body.velocity.y;
				this.target.isAttacking = true;
			}
		}

	}

}