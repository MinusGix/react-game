import React from 'react';

import {
	StyledContainer,
	Container
} from './Container.js';

export class Alert extends React.Component {
	render () {
		return (<Modal footer={
			<GameButton 
				text="Ok" 
				onClick={}
			/>
		}>

		</Modal>)
	}
}

export class Modal extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			shown: false  || this.props.
		};
	}
	render () {
		if(this.state.shown) {
			return (<div className="modal-wrapper">
			<StyledContainer className="modal">
				{this.props.children}
				<Container className="footer">
					{this.props.footer}
				</Container>
			</StyledContainer>
		</div>);
		} else {
			return
		}
	}
}