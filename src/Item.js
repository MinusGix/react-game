//import React from 'react';

export class Item {
	constructor (name, description, value) {
		if(!name) name = 'Error no name supplied';

		if(!description) description = 'No Description.';

		if(!value) value = 0;

		this.arguments = Array.prototype.slice.call(arguments);

		this.name = name;
		this.description = description;
		this.value = value;
		this.type = ['item'];
	}

	clone () {
		return new this.constructor(...this.arguments);
	}

	getName (game) {
		let type = typeof(this.name);

		if(type === 'function') {
			return this.name(game);
		} else {
			return this.name;
		}
	}

	getDescription (game) {
		let type = typeof(this.description);

		if(type === 'function') {
			return this.description(game);
		} else {
			return this.description;
		}
	}

	getValue (game) {
		let type = typeof(this.value);

		if(type === 'function') {
			return this.value(game);
		} else {
			return this.value;
		}
	}
}

export class UsableItem extends Item {
	constructor (name, description, value, onUse) {
		super(name, description, value);

		if(!onUse) onUse = (game) => true;

		this.arguments = Array.prototype.slice.call(arguments);

		this.onUse = onUse;
		this.type.push('usable-item');
	}

	use (game) {
		return this.onUse(game);
	}
}

export class EquippableItem extends Item {
	constructor (name, description, value, options) {
		super(name, description, value);

		if (!options) options = {};

		if(!options.onEquip) options.onEquip = (game) => true;

		if(!options.onUnEquip) options.onUnEquip = (game) => true;

		this.arguments = Array.prototype.slice.call(arguments);

		this.onEquip = options.onEquip;
		this.onUnEquip = options.onUnEquip;

		this.equipped = false;

		this.type.push('equippable-item');
	}
}

// WEAPONS

export class Weapon extends EquippableItem {
	constructor (name, description, value, options) {
		super(name, description, value, options);

		if(!options.damage) options.damage = [0, 0];

		if(typeof(options.damage) === 'number') options.damage = [options.damage, 0];

		this.arguments = Array.prototype.slice.call(arguments);

		this.damage = options.damage;

		this.type.push('weapon');
	}

	getDamage (game) {
		return this.damage[0] + this.damage[1];
	}
}

export class OneHandedWeapon extends Weapon {
	constructor () {
		super(...arguments);
		this.equipType = 'hand';
	}
}

export class TwoHandedWeapon extends Weapon {
	constructor () {
		super(...arguments);
		this.equipType = 'twohand';
	}
}


// ARMOR

export class Armor extends EquippableItem {
	constructor (name, description, value, options) {
		super(name, description, value, options);

		if(!options.defense) options.defense = [0, 0];

		if(typeof(options.defense) === 'number') options.defense = [options.defense, 0];

		this.arguments = Array.prototype.slice.call(arguments);

		this.defense = options.defense;
	}

	getDefense (game) {
		return this.defense[0] + this.defense[1];
	}
}

export class ArmorDecor extends Armor {
	constructor (name, description, value, options) {
		super(name, description, value, options);
		
		this.equipType = 'decor';
	}
}

export class ArmorHead extends Armor {
	constructor (name, description, value, options) {
		super(name, description, value, options);
		
		this.equipType = 'head';
	}
}

export class ArmorArm extends Armor {
	constructor (name, description, value, options) {
		super(name, description, value, options);
		
		this.equipType = 'arm';
	}
}
/* meh might as well just make ArmorArm reach down to the hand, if i really want to i can recode the counters or somethin
export class ArmorHand extends Armor {
	constructor (name, description, value, options) {
		super(name, description, value, options);
		
		this.equipType = 'hand';
	}
}*/

export class ArmorLeg extends Armor {
	constructor (name, description, value, options) {
		super(name, description, value, options);
		
		this.equipType = 'leg';
	}
}

export class ArmorFeet extends Armor {
	constructor (name, description, value, options) {
		super(name, description, value, options);
		
		this.equipType = 'feet';
	}
}



