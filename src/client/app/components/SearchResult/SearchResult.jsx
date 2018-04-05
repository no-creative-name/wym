import React from 'react';
import { render } from 'react-dom';

export default class SearchResult extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    if (this.props.onSubmit) {
      this.props.onSubmit(this.props.resultNumber);
    }
  }

  render() {
    let resultClass = "wym-search-result";

    if (this.props.active == 'true') {
      resultClass = "wym-search-result active";
    }

    return <tr onClick={this.onClick} className={resultClass}>
      <td className="wym-search-result-image">
        <img className="wym-movieposter--small" src={this.props.movieResult.img}></img>
      </td>
      <td className="wym-search-result-text">{this.props.movieResult.title}</td>
      <td className="wym-search-result-text">{this.props.movieResult.year}</td>
    </tr>
  }

}
