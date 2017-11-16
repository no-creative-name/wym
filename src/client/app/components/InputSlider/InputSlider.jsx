import React from 'react';

export default class InputSlider extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      value: props.value || 0
    }

    this.onChange = this.onChange.bind(this);
  }

  onChange (event) {
		this.setState({value: event.target.value});
    if(this.props.onSubmit) {
      this.props.onSubmit(event.target.value);
    }
	}

  render () {
    return <input className="slider wym-timecode-input-slider" onChange={this.onChange} value={this.state.value} type="range" min="0" max={this.props.movieLengthInMinutes}></input>
  }
}
