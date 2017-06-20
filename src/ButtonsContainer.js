import React from 'react';
import {
	Container
} from './Container.js';
import {
	GameButton
} from './GameMisc';


export class ButtonsContainer extends React.Component {
	render () {
		return (<Container id="buttons-container" maxHeight="40%">
			{((!this.props.isCurrentChannelNull) ? this.props.currentScene.buttons.map((button, index) => {
				if(button.getAppear(this.props.game)){
					return (<GameButton 
						key={"game-button-" + index + "-" + (index*2)} 
						text={button.getText(this.props.game)} 
						onClick={() => button.onClick(this.props.game)}
					/>);
				}
				return false;
			}) : false)}
		</Container>);
	}
}