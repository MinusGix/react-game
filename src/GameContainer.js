import React from 'react';
import {
	StyledContainer
} from './Container.js';
import {
	GameFullText, 
	GameTitle
} from './GameMisc';
import {
	ButtonsContainer
} from './ButtonsContainer.js';

export class GameContainer extends React.Component {
	render () {
		let currentScene = this.props.game.state.currentScene;
		let isCurrentChannelNull = currentScene === null;
		return (<StyledContainer id="main-container" className="inline">
			<GameTitle 
				text={(!isCurrentChannelNull) ? 
					currentScene.getTitle(this.props.game) 
					: 
					'Loading....'
				}
			/>
			<GameFullText 
				isCurrentChannelNull={isCurrentChannelNull} 
				game={this.props.game} 
				currentScene={currentScene} 
			/>
			<ButtonsContainer 
				isCurrentChannelNull={isCurrentChannelNull} 
				game={this.props.game} 
				currentScene={currentScene}
			/>
		</StyledContainer>);
	}
}