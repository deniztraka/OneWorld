/* global Phaser */

(function (window, Phaser) {
  'use strict';

  /**
   * Mobile Input Joystick plugin for Phaser.io
   */

  Phaser.Plugin.JoyStick = function (game, parent) {
    Phaser.Plugin.call(this, game, parent);



    this.input = this.game.input;
    this.imageGroup = [];

    this.imageGroup.push(this.game.add.sprite(0, 0, 'vjoy_cap'));
    this.imageGroup.push(this.game.add.sprite(0, 0, 'vjoy_body'));
    this.imageGroup.push(this.game.add.sprite(0, 0, 'vjoy_body'));
    this.imageGroup.push(this.game.add.sprite(0, 0, 'vjoy_base'));

    this.imageGroup.forEach(function (e) {
      e.anchor.set(0.5);
      e.visible = false;
      e.fixedToCamera = true;
    });
  };

  Phaser.Plugin.JoyStick.prototype = Object.create(Phaser.Plugin.prototype);
  Phaser.Plugin.JoyStick.prototype.constructor = Phaser.Plugin.JoyStick;

  Phaser.Plugin.JoyStick.prototype.settings = {
    maxDistanceInPixels: 5,
    maxSpeed: 50
  };


  Phaser.Plugin.JoyStick.prototype.cursors = {
    up: false,
    down: false,
    left: false,
    right: false
  };

  Phaser.Plugin.JoyStick.prototype.speed = {
    x: 0,
    y: 0
  };

  Phaser.Plugin.JoyStick.prototype.create = function (x, y) {

    initialPoint = new Phaser.Point(x, y);

    this.imageGroup.forEach(function (e) {
      e.visible = true;
      e.bringToTop();

      e.cameraOffset.x = initialPoint.x;
      e.cameraOffset.y = initialPoint.y;

    }, this);
    this.pointer = this.input.activePointer;

    this.input.onDown.add(enableCompass, this);
  };

  Phaser.Plugin.JoyStick.prototype.remove = function () {
    this.input.onDown.remove(enableCompass, this);
    this.input.onUp.remove(disableCompass, this);
  };

  Phaser.Plugin.JoyStick.prototype.angle = 0;

  var initialPoint;

  var enableCompass = function (pointer) {
    if (initialPoint.distance(pointer.position) > 50) {
      return;
    }

    this.preUpdate = setDirection.bind(this);
  };

  var disableCompass = function () {
    this.cursors.up = false;
    this.cursors.down = false;
    this.cursors.left = false;
    this.cursors.right = false;

    this.speed.x = 0;
    this.speed.y = 0;

    this.preUpdate = empty;

    this.imageGroup.forEach(function (e, i) {
      e.cameraOffset.x = initialPoint.x;
      e.cameraOffset.y = initialPoint.y;
    }, this)

  };

  var empty = function () {};

  var setDirection = function () {
    if (!this.pointer.active) {
      disableCompass.bind(this)();
      this.imageGroup.forEach(function (e, i) {
        e.cameraOffset.x = initialPoint.x;
        e.cameraOffset.y = initialPoint.y;
      }, this)
      return;
    }

    var d = initialPoint.distance(this.pointer.position);

    var maxDistanceInPixels = this.settings.maxDistanceInPixels;

    var deltaX = this.pointer.position.x - initialPoint.x;
    var deltaY = this.pointer.position.y - initialPoint.y;

    if (this.settings.singleDirection) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        deltaY = 0;
        this.pointer.position.y = initialPoint.y;
      } else {
        deltaX = 0;
        this.pointer.position.x = initialPoint.x;
      }
    }

    var angle = initialPoint.angle(this.pointer.position);
    //Phaser.Plugin.JoyStick.prototype.angleFromDegrees = 
    //Phaser.Plugin.JoyStick.prototype.angleFromDegrees = angle * 180 / Math.PI;
    if (d > maxDistanceInPixels) {
      deltaX = Math.cos(angle) * maxDistanceInPixels;
      deltaY = Math.sin(angle) * maxDistanceInPixels;
    }

    this.speed.x = parseInt((deltaX / maxDistanceInPixels) * 100 * -1, 10);
    if (this.speed.x > this.settings.maxSpeed) {
      this.speed.x = this.settings.maxSpeed;
    } else if (this.speed.x < -this.settings.maxSpeed) {
      this.speed.x = -this.settings.maxSpeed;
    }

    this.speed.y = parseInt((deltaY / maxDistanceInPixels) * 100 * -1, 10);
    if (this.speed.y > this.settings.maxSpeed) {
      this.speed.y = this.settings.maxSpeed;
    } else if (this.speed.y < -this.settings.maxSpeed) {
      this.speed.y = -this.settings.maxSpeed;
    }

    this.cursors.up = (deltaY < 0);
    this.cursors.down = (deltaY > 0);
    this.cursors.left = (deltaX < 0);
    this.cursors.right = (deltaX > 0);

    this.imageGroup.forEach(function (e, i) {
      e.cameraOffset.x = initialPoint.x + (deltaX) * i / 3;
      e.cameraOffset.y = initialPoint.y + (deltaY) * i / 3;
    }, this);
  };

  Phaser.Plugin.JoyStick.prototype.preUpdate = empty;

}.call(this, window, Phaser));