import React from 'react';

export default class Input extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onChange(event) {
    if (this.props.onChange) {
      this.props.onChange(event.target.value);
    }
  }

  onClick(event) {
    event.target.select();
  }

  render() {
    return <input className="input wym-input" value={this.props.value} placeholder={this.props.placeholder} onChange={this.onChange} onClick={this.onClick} />
  }
}
