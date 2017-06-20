import React from 'react';

export class DropdownMenu extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			open: false
		};
	}
	render () {
		return (<div className="dropdown" style={this.props.style || {}}>
			<span 
				aria-label="Item Options" 
				title="Item Options" 
				onClick={() => {
					this.setState((prevState, props) => {
						let open = prevState.open;

						if (!open && typeof(this.props.onOpen) === 'function') {
							this.props.onOpen();
						} else if (typeof(this.props.onClose) === 'function' && open) {
							this.props.onClose();
						}

						return {
							open: !open
						};
					})
				}}
			>&#9776;</span>
			{(
				(this.state.open && typeof(this.props.options) === 'object') ? (<div className="dropdown-menu">
					{this.props.options.map((option, index) => {
						if(option.show === true || option.show === undefined) {
							return (<div 
								className="dropdown-option" 
								onClick={() => {
									this.setState({
										open: false
									});
									if(option.onClick) option.onClick();
								}} 
								key={"dropdown-option-" + index}
							>{option.text}</div>);
						}
						return null;
					})}
				</div>):null
			)}
		</div>);
	}
}