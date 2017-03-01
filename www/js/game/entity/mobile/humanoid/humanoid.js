function Humanoid(game, x, y, key, bodyParts) {

    var parts = {
        hear: {
            key: "character_male_hair_raven",
            sprite: null,
        },
        torso: {
            key: "character_male_torso_chest",
            sprite: null,
        },
        leg: {
            key: "character_male_leg_pants_teal",
            sprite: null,
        },
        feet: {
            key: "character_male_feet_shoes_black",
            sprite: null,
        }
    };

    $.extend(parts,bodyParts);

    Mobile.call(this, game, x, y, key);

    //Creating body parts
    for (var key in parts) {
        parts[key].sprite = game.make.sprite(0, 0, parts[key].key);
        parts[key].sprite.anchor.setTo(0.5, 0.5);
        this.addChild(parts[key].sprite);
    }

    this.addAnimations(this.animationList);
}

Humanoid.prototype = Object.create(Mobile.prototype);
Humanoid.prototype.constructor = Humanoid;

Humanoid.prototype.update = function () {
    Mobile.prototype.update.call(this);
};

Humanoid.prototype.damage = function (value) {
    Mobile.prototype.damage.call(this, value);


};

Humanoid.prototype.kill = function () {
    Mobile.prototype.kill.call(this);
};