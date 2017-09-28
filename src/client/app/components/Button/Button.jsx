import React from 'react';


export default class Button extends React.Component {

  constructor (props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick () {
      this.props.onClick();
  }

  render () {
    return <button className="button" onClick={this.onClick}>{this.props.buttonText}</button>
  }

}
