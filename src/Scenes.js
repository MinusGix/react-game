import React from 'react';

import {
	Scene, 
	SceneButton
} from './Scene.js';
import {
//	StyledContainer, 
//	Container
} from './Container.js';
import {
//	GameContainer
} from './GameContainer.js';
import {
//	GameFullText, 
	GameText, 
//	GameButton, 
//	GameTitle, 
//	GameCheckbox, 
	GameInput, 
	GameSelect,
//	GameImage
} from './GameMisc';
import {
//	ButtonsContainer
} from './ButtonsContainer.js';
import {
//	PlayerContainer
} from './PlayerContainer.js';
import {
//	SituationalContainer
} from './SituationalContainer.js';



export var Scenes = {
	characterSelection: new Scene('Name Selection', (game) => {
		return ['react', (<div>
			<GameText 
				text="Choose:"
			/>
			<GameInput
				onChange={(event, text) => game.setPlayer({
					name: text
				})}
				value={game.Player.name}
				text="Name"
			/>
			<GameSelect
				options={[
					"male",
					"female"
				]}
				onChange={(event, value) => game.setPlayer({
					gender: value
				})}
				text="Gender"
			/>
		</div>)];
	}, [
		new SceneButton('Confirm', (game) => {
			game.gotoScene(Scenes.Osli_LivingDistrict_PlayerHome_FrontRoom);
		})
	]),


	// ============== OSLI

	// ==== Osli Center
	
	Osli_Center: new Scene('Osli: Center', (game) => {
		let text = "You are in the main travel part of town.";

		text += '\nThe gates on the wooden palisade walls are open and people mill about.';

		text += '\nYou can see the way to the Shopping District and the Living District.';

		return text;
	}, [
		new SceneButton('Head to Shopping District', (game) => {
			game.gotoScene(Scenes.Osli_ShoppingDistrict);
		}),
		new SceneButton('Head to Living District', (game) => {
			game.gotoScene(Scenes.Osli_LivingDistrict);
		})
	]),

	// ==== Osli living district
	Osli_LivingDistrict: new Scene ('Osli: Living District', (game) => {
		let text = 'A long circle of houses with smaller circles of houses inside larger circles. Each circle had two roads leading out.';
		return text;
	}, [
		new SceneButton('Head to Osli Center.', (game) => {
			game.gotoScene(Scenes.Osli_Center);
		}),
		new SceneButton('Your House', (game) => {
			game.gotoScene(Scenes.Osli_LivingDistrict_PlayerHome_FrontRoom);
		})
	], [['img', './OsliLivingDistrict.png']]),
	Osli_LivingDistrict_PlayerHome_FrontRoom: new Scene('Osli: Your Home, Front Room', (game) => {
		let text = 'A small two-room cottage where you lived with your mother until she died of Bonerot.';
		text += '\nThe front room has a wood-stove and a small circular table with two chairs positioned around around it. A painting of you, your mother and your father is positoned on the wall. You have a small enchanted fridge to keep your food cold.';

		return text;
	}, [
		new SceneButton('Go to Bedroom', (game) => {
			game.gotoScene(Scenes.Osli_LivingDistrict_PlayerHome_Bedroom);
		}),
		new SceneButton('Go outside', (game) => {
			game.gotoScene(Scenes.Osli_LivingDistrict);
		})
	]),
	Osli_LivingDistrict_PlayerHome_Bedroom: new Scene('Osli: Your Home, Bedroom', (game) => {
		let text = 'In the bedroom you have two beds, a larger one which your mother used to sleep on and a smaller one you sleep in.';

		return text;
	}, [
		new SceneButton('Go to the Front Room', (game) => {
			game.gotoScene(Scenes.Osli_LivingDistrict_PlayerHome_FrontRoom);
		})
	]),

	// ==== Osli shopping district

	Osli_ShoppingDistrict: new Scene('Osli: Shopping District', (game) => {
		let text = "You stand at the entrance to the small shopping district here in Osli.";
		
		text += '\nIt has a curving road with shops attempting to sell their goods to you and other people.';

		return text;
	}, [
		new SceneButton('Head to Osli Center', (game) => {
			game.gotoScene(Scenes.Osli_Center);
		})
	])

	
};