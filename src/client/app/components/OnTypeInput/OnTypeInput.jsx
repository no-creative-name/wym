import React from 'react';

export default class OnTypeInput extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      value: props.value || ''
    }

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  render () {
    return <input className="input" value={this.props.value} placeholder="Search for a movie..." onChange={this.onChange} onClick={this.onClick} />
  }

  onChange (event) {
		this.setState({value: event.target.value});
		this.onSubmit(event.target.value);
    if(this.props.onChange) {
      this.props.onChange(event.target.value);
    }
	}


  onClick (event) {
    this.props.onChange('');
  }

  onSubmit (value) {
    if(this.props.onSubmit) {
      if(value == "") {
        this.props.onSubmit("");
      }
      else {
        this.props.onSubmit(value);
      }
    }
  }

}
