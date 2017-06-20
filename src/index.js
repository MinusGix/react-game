import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import './index.css';

import {
	Item,
	UsableItem,
	Weapon
} from './Item.js';
import {
	Items
} from './Items.js';
import {
	Scene, 
	SceneButton
} from './Scene.js';
import {
	Scenes
} from './Scenes.js';
import {
	StyledContainer, 
	Container
} from './Container.js';
import {
	GameContainer
} from './GameContainer.js';
import {
	GameFullText, 
	GameText, 
	GameButton, 
	GameTitle, 
	GameCheckbox, 
	GameInput, 
	GameSelect,
	CurrentTime,
	GameImage
} from './GameMisc';
import {
	ButtonsContainer
} from './ButtonsContainer.js';
import {
	PlayerContainer
} from './PlayerContainer.js';
import {
	SituationalContainer
} from './SituationalContainer.js';
import Modal from 'react-modal';
import {
	DropdownMenu
} from './DropDown.js';

class Game extends React.Component {
	//OTHER
	constructor (props) {
		super(props);
		this.state = {
			Player: {
				name: 'Player#1',
				gender: 'male',
				health: [100, 100], //current, max
				inventory: [],
				itemID: 0,
				equipNumbers: {
					decor: 4,
					head: 1,
					body: 1,
					arm: 1,
					hand: 1,
					leg: 1,
					feet: 1
				}
			},
			currentScene: null,
			currentTime: moment().year(600).month(0).date(1).hour(9).minute(0)
		}
		this.Scenes = Scenes;
		this.Items = Items;
	}


	// TIME
	getReadableTime () {
		return this.state.currentTime.format('\\Y\\e\\a\\r Y\\, MMMM \\t\\h\\e Do\\, dddd\\. h:mmA');
	}
	getIsDay () {
		let hour = this.state.currentTime.get('h');
		return hour > 8 && hour < 19;
	}
	getIsNight () {
		return !this.getIsDay();
	}

	//PLAYER
	getEquipped () {
		//Code will not pay attention if they have extra somehow equipped, but it won't let them equip extra Items
		// which will stop it before it happens, but if someone decides to cheat in some extra held items it's not gonna care
		let equips = {
			decor: [],
			head: [],
			body: [],
			arm: [],
			hand: [],
			leg: [],
			feet: []
		};
		let inventory = this.state.Player.inventory;
		for (let i = 0; i < inventory.length; i++) {
			if (inventory[i].equipped && equips[inventory[i].equipType] !== undefined) {
				equips[inventory[i].equipType].push(inventory[i]);
			}
		}
		return equips;
	}

	equipItem (id, game) {
		let equips = this.getEquipped();
		this.setPlayer((prevState, props) => {
			let inventory = prevState.Player.inventory.slice();
			let item = inventory[this.getPlayerItemByID(inventory, id)];

			if(item === undefined){
				throw new Error("Item with the id, " + id + " does not exist");
			}

			if (equips[item.equipType] !== undefined) {
				if(equips[item.equipType].length < prevState.Player.equipNumbers[item.equipType]) {
					item.equipped = true;
					item.onEquip(game);
				}
			} else {
				throw new Error('Item by the name,"' + item.name + '" equipType is undefined.' );
			}

			return {inventory};
		});
	}

	unEquipItem (id, game) {
		this.setPlayer((prevState, props) => {
			let inventory = prevState.Player.inventory.slice();
			let item = inventory[this.getPlayerItemByID(inventory, id)];

			if(item === undefined){
				throw new Error("Item with the id, " + id + " does not exist");
			}

			if(item.equipped) {
				item.equipped = false;
				item.onUnEquip(game);
			}else{
				alert('You cannot unequip that.');
			}

			return {inventory};
		})
	}

	getPlayerItemByID (inventory, id) {
		for (let i = 0; i < inventory.length; i++) {
			if(inventory[i].id === id) {
				return i;
			}
		}

		return false;
	}

	setPlayer (newPlayer) {
		if (typeof(newPlayer) === 'function') {
			this.setState((prevState, props) => {
				return {Player: Object.assign(prevState.Player, newPlayer(prevState, props))}
			})
		} else {
			this.setState((prevState, props) => {
				return {Player: Object.assign(prevState.Player, newPlayer)}
			});
		}
	}

	givePlayerItem (item, noClone) {
		this.setPlayer((prevState, props) => {
			let prevInv = prevState.Player.inventory.slice(),
				itemID = prevState.Player.itemID;
			if (!!noClone) {
				if(item.constructor === Array) {
					for(let i = 0; i < item[1]; i++) {
						prevInv.push(item[0]);
					}
				} else {
					prevInv.push(item);
				}
			} else {
				if(item.constructor === Array) {
					for(let i = 0; i < item[1]; i++) {
						let newItem = item[0].clone();
						newItem.id = itemID++;
						prevInv.push(newItem);
					}
				} else {
					let newItem = item.clone();
					newItem.id = itemID++;
					prevInv.push(newItem);
				}
			}

			return {
				inventory: prevInv,
				itemID
			};
		});
		return true;
	}

	takePlayerItem (item) {
		this.setPlayer((prevState, props) => {
			let prevInv = prevState.Player.inventory.slice();
			if (typeof(item) === 'number') {
				for(let i = 0; i < prevInv.length; i++){
					if(prevInv[i].id === item) {
						prevInv.splice(i, 1);
						break;
					}
				}
			} else {
				for (let i = 0; i < prevInv.length; i++){
					if (prevInv[i] === item) {
						prevInv.splice(i, 1);
						i = prevInv.length;
						break;
					}
				}
			}
			return {
				inventory: prevInv
			};
		});
		return true;
	}

	subtractPlayerHealth (amount) {
		this.setPlayer((prevState, props) => {
			var lastHealth = prevState.Player.health;
			var newHealth = [lastHealth[0] - amount, lastHealth[1]];

			if (newHealth[0] > newHealth[1]) {
				newHealth[0] = newHealth[1];
			}

			if (newHealth[0] <= 0) {
				// TODO: MAKE DYING WORK
				alert('You died!');
			}

			return {
				health: newHealth
			};
		});
	}

	addPlayerHealth (amount) {
		this.setPlayer((prevState, props) => {
			var lastHealth = prevState.Player.health;
			var newHealth = [lastHealth[0] + amount, lastHealth[1]];

			if (newHealth[0] > newHealth[1]) {
				newHealth[0] = newHealth[1];
			}

			if (newHealth[0] <= 0) {
				// TODO: MAKE DYING WORK
				alert('You died!');
			}

			return {
				health: newHealth
			};
		});
	}

	setPlayerHealth (amount) {
		this.setPlayer((prevState, props) => {
			var lastHealth = prevState.Player.health;
			var newHealth = [amount, lastHealth[1]];

			if (newHealth[0] > newHealth[1]) {
				newHealth[0] = newHealth[1];
			}

			if (newHealth[0] <= 0) {
				// TODO: MAKE DYING WORK
				alert('You died!');
			}

			return {
				health: newHealth
			};
		});
	}

	//SCENE
	gotoScene (scene, passArgs) {
		//passArgs is for if you want to pass something to the next scene from a previous one
		if (scene !== null) {
			this.setState((prevState, props) => {
				return {
					currentScene: scene,
					currentSceneArgs: passArgs || prevState.currentSceneArgs
				};
			});
			if(scene !== this.state.currentScene){
				scene.playerVisitedCounter++;
			}
		} else {
			alert("There was an error going to a scene.");
		}
	}


	//REACT, not the constructor tho
	componentDidMount () {
		this.gotoScene(this.Scenes.characterSelection);
		this.givePlayerItem([Items.Bread, 3]);
		this.givePlayerItem([Items.WoodenSword, 2]);
		this.givePlayerItem([Items.OldCoin, 4]);
	}

	render () {
		let game = {
			//State
			state: this.state,
			setState: this.setState.bind(this),
			//Player
			Player: this.state.Player,
			setPlayer: this.setPlayer.bind(this),
			subtractPlayerHealth: this.subtractPlayerHealth.bind(this),
			addPlayerHealth: this.addPlayerHealth.bind(this),
			setPlayerHealth: this.setPlayerHealth.bind(this),
			givePlayerItem: this.givePlayerItem.bind(this),
			takePlayerItem: this.takePlayerItem.bind(this),
			getEquipped: this.getEquipped.bind(this),
			equipItem: this.equipItem.bind(this),
			unEquipItem: this.unEquipItem.bind(this),
			getPlayerItemByID: this.getPlayerItemByID.bind(this),
			//Scenes
			Scenes: this.Scenes,
			gotoScene: this.gotoScene.bind(this),
			//Time
			getReadableTime: this.getReadableTime.bind(this),
			getIsDay: this.getIsDay.bind(this),
			getIsNight: this.getIsNight.bind(this),
		};
		return (<div>
			<GameContainer 
				game={game} 
			/>
			<PlayerContainer 
				game={game}
			/>
			<SituationalContainer 
				game={game}
			/>
		</div>);
	}
}

ReactDOM.render(<Game />, document.getElementById('root'));
