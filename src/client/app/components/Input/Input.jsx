import React from 'react';

export default class Input extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      value: props.value || ''
    }

    this.onChange = this.onChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onChange (event) {
		this.setState({value: event.target.value});
    if(this.props.onChange) {
      this.props.onChange(event.target.value);
    }
	}

	onKeyPress (event) {
		if(event.charCode==13) {
			this.onSubmit(event.target.value);
		}
	}

  onClick (event) {
    this.setState({value: ''});
  }

  onSubmit (value) {
    if(this.props.onSubmit) {
      if(value == "") {
        this.props.onSubmit("äöü");
      }
      else {
      this.props.onSubmit(value);
      }
    }
  }

  render () {
    return <input className="input" value={this.state.value} placeholder={this.props.placeholder} onChange={this.onChange} onKeyPress={this.onKeyPress} onClick={this.onClick}/>
  }
}
