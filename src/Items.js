//import React from 'react';
import {
	Item,
	UsableItem,
	EquippableItem,
	Weapon,
	OneHandedWeapon,
	TwoHandedWeapon,
	Armor,
	ArmorDecor,
	ArmorArm,
	ArmorFeet,
	ArmorHand,
	ArmorHead,
	ArmorLeg
} from './Item.js';

export var Items = {
	OldCoin: new Item('Old Coin', 'An old coin.', 5),
	Bread: new UsableItem('Bread', 'A loaf of bread.', 5, (game) => {
		alert('om nom nom');
		game.takePlayerItem(this);
		return true;
	}),
	WoodenSword: new OneHandedWeapon('Wooden Sword', 'A cheaply made wooden sword.', 2, {
		damage: 8, 
		onEquip: (game) => {
			alert('Equippy!');
		},
		onUnEquip: (game) => {
			alert('unEquiped');
		}
	})
}