import React from 'react';

import {
	GameText, 
	GameImage
} from './GameMisc.js';

export class Scene {
	constructor (title, text, buttons, extras) {
		if(!title) title = "- Error: No Title -";

		if(!text) text = "- Error: No Text -";

		if(!buttons) buttons = [];
		
		if(!extras) extras = [];

		this.title = title;
		this.text = text;
		this.buttons = buttons;
		this.extras = extras;
		this.playerVisitedCounter = 0;
	}

	getTitle (game) {
		let type = typeof(this.title);

		if (type === 'function') {
			return this.title(game);
		} else if (type === 'string') {
			return this.title;
		} else if (type === 'array') {
			return this.title.join(' ');
		}
		return '- Error: Text Not A Valid Type -';
	}

	getText (game) {
		let type = typeof(this.text);

		if (type === 'function') {
			return this.text(game);
		} else if (type === 'string') {
			return ['string', this.text];
		} else if (type === 'array') {
			return ['string', this.text.join(' ')];
		}
		return '- Error: Text Not A Valid Type -';
	}

	getExtras (game) {
		var extras = [];
		for(let i = 0; i < this.extras.length; i++) {
			if (this.extras[i].constructor === Array) {
				if (typeof(this.extras[i][0]) === 'function') {
					extras.push(this.extras[i][0](game));
				}else if (typeof(this.extras[i][0]) === 'string') {
					let ei0 = this.extras[i][0].toLowerCase();
					
					if (ei0 === 'function') {
						extras.push(this.extras[i][1](game));
					} else if (ei0 === 'react') {
						extras.push(this.extras[i][1]);
					} else if (ei0 === 'img' || ei0 === 'image') {
						extras.push(<GameImage key={"GameImage-" + i + "-" + this.extras[i][1]} src={this.extras[i][1]} />);
					} else if (ei0 === 'text') {
						extras.push(<GameText key={"GameText-" + i} text={this.extras[i][1]} />);
					} else {
						extras.push(this.extras[i][1]);
					}
				}
			} else if (this.extras[i].constructor === Function) {
				extras.push(this.extras[i](game));
			} else if (this.extras[i].constructor === String) {
				extras.push(this.extras[i]);
			}
		}
		return extras;
	}
}

export class SceneButton {
	constructor (text, onClick, shouldAppear) {
		if(!text) text = '- Error: No Text -';

		if(!onClick) onClick = () => alert("- Error: No onClick function for this button -");

		if(!shouldAppear) shouldAppear = true;

		this.text = text;
		this.onClick = onClick;
		this.shouldAppear = shouldAppear;
	}

	getText (game) {
		let type = typeof(this.text);

		if (type === 'function') {
			return this.text(game);
		} else if (type === 'string') {
			return this.text;
		} else if (type === 'array') {
			return this.text.join(' ');
		}
		return '- Error: Text Not A Valid Type -';
	}

	getAppear (game) {
		let type = typeof(this.shouldAppear);

		if (type === 'function') {
			return this.shouldAppear(game);
		} else if (type === 'boolean') {
			return this.shouldAppear;
		} else if (type === 'string' || type === 'number') {
			return !!this.shouldAppear; //rethink your life if you're using strings/numbers as bools
		}
		return true; // might as well make it visible
	}
}