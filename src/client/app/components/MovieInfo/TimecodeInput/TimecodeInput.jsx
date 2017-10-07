import React from 'react';
import Input from '../../Input/Input.jsx';
import Button from '../../Button/Button.jsx';

export default class TimecodeInput extends React.Component {

	constructor (props) {
		super(props);
		this.state = {
			hours: '',
			minutes: '',
			seconds: ''
		}
		this.onChangeHours = this.onChangeHours.bind(this);
		this.onChangeMinutes = this.onChangeMinutes.bind(this);
		this.onChangeSeconds = this.onChangeSeconds.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChangeHours (value) {
		this.setState({hours: value});
	}
	onChangeMinutes (value) {
		this.setState({minutes: value});
	}
	onChangeSeconds (value) {
		this.setState({seconds: value});	
	}

	onSubmit () {

		let hours = this.state.hours;
		let minutes = this.state.minutes;
		let seconds = this.state.seconds;

		if(minutes == '') {
			minutes = '0';
		}
		if(seconds == '') {
			seconds = '0';
		}

		let zero = "" + 0;

		if (minutes.toString(10).length == 1) {
			minutes = zero.concat(minutes)
		}
		if (seconds.toString(10).length == 1) {
			seconds = zero.concat(seconds)
		}

		let timecode = hours.concat(minutes.concat(seconds));

		if(this.props.onSubmit) {
			this.props.onSubmit(timecode);
		}
	}

	render () {
		let minutesInput = null;

		return (
		<div className="wym-time-input">
			<div className="wym-timecode-input">
				<Input value={this.state.hours} placeholder="h" onChange={this.onChangeHours} onSubmit={this.onSubmit}/>
				<Input value={this.state.minutes} placeholder="m" onChange={this.onChangeMinutes} onSubmit={this.onSubmit}/>
				<Input value={this.state.seconds} placeholder="s" onChange={this.onChangeSeconds} onSubmit={this.onSubmit}/>
			</div>
			<Button buttonText="SEARCH" onClick={this.onSubmit}/>
		</div>
		);
	}


}
