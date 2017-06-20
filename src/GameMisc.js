/*global confirm*/
/*eslint no-restricted-globals: ["warn", confirm"]*/
// ^ because bloody hell I want my bloody confirm box. I don't need to finangle with a bloody modal right now

import React from 'react';
import {
//	StyledContainer, 
	Container
} from './Container.js';
import {
	DropdownMenu
} from './DropDown.js';

export class GameFullText extends React.Component {
	render () {
		var text,
			extras = [];
		if(!this.props.isCurrentChannelNull) {
			text = this.props.currentScene.getText(this.props.game);
			let hasType = false;
			if (text.constructor === Array) {
				if(text[0] === 'string') {
					// just ignore it since we'll do it after
				} else if (text[0] === 'react') {
					hasType = true;
				}
				text = text[1];
			}

			if(!hasType && typeof(text) === 'string') {
				text = text.split('\n').map((text, index) => {
					console.log('boop');
					return (<GameText 
						key={"GameTitle-" + index + "-" + (index*2)} 
						text={text}
					/>);
				})
			}

			extras = this.props.currentScene.getExtras(this.props.game);
		}
		return (<Container maxHeight="40%">
			{text}
			{extras.map((val, index) => {
				if (typeof(val) === 'string') {
					return (<GameText 
						key={"GameTitle-" + index + '-Extra-' + (index*2)} 
						text={val}
					/>);
				} else {
					return val;
				}
			})}
		</Container>);
	}
}

export class GameButton extends React.Component {
	render () {
		return (<div 
			className="game-button" 
			onClick={this.props.onClick}
		>{this.props.text}</div>);
	}
}


export class GameTitle extends React.Component {
	render () {
		return (<h1 className="game-title">{this.props.text}</h1>);
	}
}

export class GameText extends React.Component {
	render () {
		return (<div>
			<p className="game-text">{this.props.text}</p>
		</div>);
	}
}


export class GameCheckbox extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			checked: this.props.checked || false
		};
	}
	render () {
		return (<div>
			<input 
				checked={this.state.checked} 
				type="checkbox" 
				onChange={(event) => {
					this.setState({
						checked: event.target.checked
					});
					if(typeof(this.props.onChange) === 'function') {
						this.props.onChange(event, event.target.checked, this.props.onChangeArgs);
					}
				}}
			/><label>{this.props.text}</label><br />
		</div>);
	}
}

export class GameInput extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			value: this.props.value || ''
		}
	}
	render () {
		
		return (<div>
			<input
				type="text" 
				value={this.state.value} 
				onChange={(event) => {
					this.setState({
						value: event.target.value
					});

					if(typeof(this.props.onChange) === 'function'){
						this.props.onChange(event, event.target.value, this.props.onChangeArgs);
					}
				}}
			/><label>{this.props.text}</label><br />
		</div>)
	}
}

export class GameSelect extends React.Component {
	constructor (props) {
		super(props);
		
		this.state = {
			value: this.props.value || this.props.options[0]
		};

	}

	render () {
		return (<div>
			<select value={this.state.value} onChange={(event) => {
					this.setState({
						value: event.target.value
					});

					if (typeof(this.props.onChange) === 'function') {
						this.props.onChange(event, event.target.value, this.props.onChangeArgs);
					}
				}}>
				{this.props.options.map((option, index) => {
					return <option key={'option-' + index}>{option}</option>;
				})}
			</select>
			<label>{this.props.text}</label><br />
		</div>);
	}
}



export class CurrentTime extends React.Component {
	render () {
		return (<div>
			<GameText
				text={(this.props.beforeText || '') + this.props.game.getReadableTime() + (this.props.afterText || '')}
			/>
		</div>);
	}
}

export class GameImage extends React.Component {
	render () {
		return (<img 
			src={this.props.src} 
			alt=""
		/>);
	}
}


//<span className="close-button" aria-label="Delete Item" title="Delete Item">&times;</span>
export class GameItem extends React.Component {
	render () {
		return (<div
			className="game-item"
		>
			<h3>{this.props.item.getName(this.props.game)}<DropdownMenu 
				style={{
					display: 'inline',
					marginLeft: "5%"
				}} 
				options={[
					{
						text: 'Throw Away',
						onClick: () => {
							if(confirm('Are you sure you want to throw away your ' + this.props.item.name + '?')){
								this.props.game.takePlayerItem(this.props.item);
							}
						},
					},
					{
						text: 'Use',
						onClick: () => alert('Use Option clicked!'),
						show: this.props.item.type.includes('usable-item')
					},
					{
						text: 'Equip',
						onClick: () => {
							this.props.game.equipItem(this.props.item.id, this.props.game);
						},
						show: !this.props.item.equipped && !!this.props.item.equipType
					},
					{
						text: 'Un-Equip',
						onClick: () => {
							this.props.game.unEquipItem(this.props.item.id, this.props.game);
						},
						show: !!this.props.item.equipped && !!this.props.item.equipType
					}
				]}
			/></h3>
			<p>{this.props.item.getDescription(this.props.game)}</p>
		</div>);
	}
}