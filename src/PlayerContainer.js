import React from 'react';
import {
	StyledContainer
} from './Container.js';
import {
	GameTitle,
	GameText,
	CurrentTime
} from './GameMisc.js';

export class PlayerContainer extends React.Component {
	render () {
		let Player = this.props.game.state.Player,
			equipped = this.props.game.getEquipped();
		console.log(equipped);
		return (<StyledContainer 
				id="player-container" 
				className="inline"
			>
			<GameTitle 
				text={Player.name}
			/>
			<CurrentTime 
				game={this.props.game}
			/>
			<GameText 
				text={"Gender: " + Player.gender}
			/>
			<GameText 
				text={"Health Points: " + Player.health[0] + '/' + Player.health[1]}
			/>

			<GameText
				text="Equipped:"
			/>

			{Object.keys(equipped).map((key, index) => {
				
				let itemGroup = equipped[key],
					text = itemGroup.map((item, index) => {
						console.log('----------')
						console.log(item);
						return item.name;
					}).join(', ');
				console.log(itemGroup, key);
				
				if(text === '') {
					text = 'None'
				}

				

				return <GameText
					text={key + ": " + text + '.'}
					key={key}
				/>
			})}
		</StyledContainer>);
	}
}
