import React from 'react';
import {render} from 'react-dom';
import TimecodeInput from './TimecodeInput/TimecodeInput.jsx';
import MoviePoster from './MoviePoster/MoviePoster.jsx';


export default class MovieInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fullplot: ''
    }
    this.buildPlot = this.buildPlot.bind(this);
    this.convertTimecode = this.convertTimecode.bind(this);
  }

  buildPlot (inputTimecode) {

    this.setState({fullplot:''});
    console.log(inputTimecode);

    let plots = [];

    for (let i = 0; i < Object.keys(this.props.movie.plot).length; i++) {
      plots.push(this.props.movie.plot[i]);
    }

    let text = "";

    for(let i = 0; i < plots.length; i++) {
        if(plots[i].timecode <= inputTimecode) {
          text = text.slice(0).concat(plots[i].text);
        }
    }

    this.setState({fullplot: text});

  }

  convertTimecode (timecode) {

      let hours = ""+Math.floor((timecode / 10000) % 10) + " h, ";
      let minutes = ""+Math.floor((timecode / 1000) % 10)+Math.floor((timecode / 100) % 10)+" m, ";
      let seconds = ""+Math.floor((timecode / 10) % 10)+Math.floor((timecode / 1) % 10) + " s";

      let convertedTime = hours+minutes+seconds;

      return convertedTime;
  }


  render () {

    let plotClass = "box wym-movie-info-plot";
    if(this.state.fullplot != '') {
      plotClass+="-active";
    }

    if(this.props.movie.key != null) {

      return <div className="wym-movie-info">
        <div className="wym-movie-meta">
          <MoviePoster className="column is-4" imageSource={this.props.movie.img}></MoviePoster>
          <div className="column is-8 wym-movie-info-text">
            <div className="wym-title">{this.props.movie.title}</div>
            <div className="wym-subtitle">{this.convertTimecode(this.props.movie.duration)}</div>
            <div className="wym-subtitle">{this.props.movie.year}</div>
            <div className="wym-subtitle">{this.props.movie.genre}</div>
          </div>
        </div>
        <div className="wym-plotbuilder">
          <TimecodeInput onSubmit={this.buildPlot}></TimecodeInput>
          <div className={plotClass}>{this.state.fullplot}</div>
        </div>
      </div>;
    }
    else {
      return <div>
      </div>;
    }
  }

}
