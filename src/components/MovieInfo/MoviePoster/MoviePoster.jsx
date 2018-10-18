import React from 'react';

export default class MoviePoster extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return <img className="wym-movieposter" src={this.props.imageSource}></img>
  }

}
