import React from 'react';
// import {Scene, SceneButton} from './Scene.js';
import {
	StyledContainer, 
	Container
} from './Container.js';
// import {GameContainer} from './GameContainer.js';
import {
//	GameFullText, 
//	GameText, 
	GameButton, 
	GameTitle, 
	GameCheckbox, 
	GameInput, 
	GameSelect,
	GameItem
} from './GameMisc';
// import {ButtonsContainer} from './ButtonsContainer.js';
// import {PlayerContainer} from './PlayerContainer.js';

export class SituationalContainer extends React.Component {
	constructor (props) {
		super(props);
		
		this.state = {
			currentSituationalScreen: 'settings'
		};

		this.situationalScreens = {
			'settings': {
				title: 'Settings',
				render: () => {
					return (<Container 
							maxHeight="70%"
						>
						<h2>Nothing Here Yet</h2>
					</Container>);
				}
			},
			'inventory': {
				title: 'Inventory',
				render: () => {
					return(<Container 
						maxHeight="70%"
					>
					{this.props.game.Player.inventory.map((item, index) => {
						return <GameItem 
							game={this.props.game}
							item={item}
							key={"GameItem-" + item.name + "-" + item.id}
						/>
					})}
					</Container>);
				}
			}
		}
	}

	render () {
		let currentScreen = this.situationalScreens[this.state.currentSituationalScreen];


		return (<StyledContainer id="situational-container" className="inline">
			<GameTitle 
				text={currentScreen.title}
			/>
			<Container maxHeight="10%">
				<GameButton 
					text="Settings" 
					onClick={() => this.setState({
						currentSituationalScreen: 'settings'
					})}
				/>
				<GameButton
					text="Inventory" 
					onClick={() => this.setState({
						currentSituationalScreen: 'inventory'
					})}
				/>
			</Container>
			{currentScreen.render.call(this)}
		</StyledContainer>);
	}
}