import React from 'react';


export default class Logo extends React.Component {

  constructor (props) {
    super(props);
  }

  render () {
    return <div className="columns">
      <div className="column is-1"></div>
      <div className="column is-10">
        <img className="wym-logo" src="app/images/logo_white.png"></img>
      </div>
      <div className="column is-1"></div>
    </div>
  }

}
