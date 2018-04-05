import React from 'react';

export default class InputSlider extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
    }

    this.onChange = this.onChange.bind(this);
  }

  onChange (event) {
    if(this.props.onSubmit) {
      this.props.onSubmit(event.target.value);
    }
	}

  render () {
    return <input className="slider wym-timecode-input-slider" onChange={this.onChange} value={this.props.value} type="range" min="0" max={this.props.movieLengthInMinutes}></input>
  }
}
