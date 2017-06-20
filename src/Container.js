import React from 'react';

export class StyledContainer extends React.Component {
	render () {
		return (<Container id={this.props.id} className={'styled-container ' + (this.props.className || '')}>
			{this.props.children}
		</Container>);
	}
}

export class Container extends React.Component {
	render () {
		return (<div 
			id={this.props.id || ''} 
			className={"container " + (this.props.className || '')} 
			style={{
				maxHeight: this.props.maxHeight || ''
			}}
		>{this.props.children}
		</div>);
	}
}



//////////////////////////////////////////////////////////
//////////////
//////////////////////////////////////////////////////////

