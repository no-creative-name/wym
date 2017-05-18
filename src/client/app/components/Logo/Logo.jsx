import React from 'react';


export default class Logo extends React.Component {

  constructor (props) {
    super(props);
  }

  render () {
    return <div className="columns">
      <div className="column is-4"></div>
      <div className="column is-4">
        <img className="wym-logo" src="app/images/logo_white.png"></img>
      </div>
      <div className="column is-4"></div>
    </div>
  }

}
