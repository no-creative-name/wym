import React from 'react';
import Input from '../../Input/Input.jsx';
import InputSlider from '../../InputSlider/InputSlider.jsx';
import Button from '../../Button/Button.jsx';

export default class TimecodeInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hours: 0,
      minutes: 0,
      seconds: 0,
      currentTimeInMinutes: 0
    }
    this.onChangeHours = this.onChangeHours.bind(this);
    this.onChangeMinutes = this.onChangeMinutes.bind(this);
    this.onChangeSeconds = this.onChangeSeconds.bind(this);
    this.onChangeSlider = this.onChangeSlider.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeHours(value) {
    this.setState({ hours: value }, this.onSubmit);
  }
  onChangeMinutes(value) {
    this.setState({ minutes: value }, this.onSubmit);
  }
  onChangeSeconds(value) {
    this.setState({ seconds: value });
  }

  updateCurrentTimeInMinutes() {
    let currentTimeInMinutes = parseInt(this.state.hours * 60) + parseInt(this.state.minutes);
    this.setState({ currentTimeInMinutes: currentTimeInMinutes });
  }

  onChangeSlider(value) {
    this.onChangeHours((value - value % 60) / 60);
    this.onChangeMinutes(value % 60);
    this.onChangeSeconds(0);

    let minutes = value % 60;
    let hours = (value - minutes) / 60;

    let zero = "" + 0;

    if (minutes.toString(10).length == 1) {
      minutes = zero.concat(minutes)
    }

    let timecode = hours.toString().concat(minutes.toString().concat("00"));

    if (this.props.onSubmit) {
      this.props.onSubmit(timecode);
    }
  }

  onSubmit() {
    this.updateCurrentTimeInMinutes();

    let hours = this.state.hours + '';
    let minutes = this.state.minutes + '';
    let seconds = this.state.seconds;

    let zero = "" + 0;

    if (minutes.toString(10).length == 1) {
      minutes = zero.concat(minutes)
    }
    if (seconds.toString(10).length == 1) {
      seconds = zero.concat(seconds)
    }

    let timecode = hours.concat(minutes.concat(seconds));

    if (this.props.onSubmit) {
      this.props.onSubmit(timecode);
    }
  }

  render() {
    return (
      <div className="wym-time-input">
        <div className="wym-timecode-input">
          <Input value={this.state.hours} placeholder="h" onChange={this.onChangeHours} />
          <Input value={this.state.minutes} placeholder="m" onChange={this.onChangeMinutes} />
          <Input value={this.state.seconds} placeholder="s" onChange={this.onChangeSeconds} />
        </div>
        <InputSlider value={this.state.currentTimeInMinutes} movieLengthInMinutes={this.props.movieLengthInMinutes} onSubmit={this.onChangeSlider} />
      </div>
    );
  }

}
