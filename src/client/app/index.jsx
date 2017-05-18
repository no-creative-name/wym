import React from 'react';
import {render} from 'react-dom';
import Logo from './components/Logo/Logo.jsx';
import OnTypeInput from './components/OnTypeInput/OnTypeInput.jsx';
import Input from './components/Input/Input.jsx';
import MovieInfo from './components/MovieInfo/MovieInfo.jsx';
import TestMovieData from '../../data/movieTest.json';
import SearchResult from './components/SearchResult/SearchResult.jsx';

import './sass/bulma.sass';
import './sass/index.scss';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      movieResults: [],
      movieResultHovered: 0,
      numberOfMovieResults: 0,
      isSearchInProgress: false,
      isStart: true,
      currentMovieData: {
        "key": null,
        "title":"XXX",
        "img":"",
        "duration":10000,
        "genre":"Generic",
        "plot":[
          {
            "key":"0",
            "text":"XYZ ",
            "timecode":3000
          }
        ]
      }
    }

    this.searchByTitle = this.searchByTitle.bind(this);
    this.onMovieSelection = this.onMovieSelection.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);

  }

  render () {

    let movieResultsDiv = this.getMovieResults();

    let headerClass = "container wym-header";
    if (this.state.isStart) {
      headerClass+=" onstart";
    }

    return <div onKeyDown={this.onKeyDown}>
      <div className={headerClass}>
        <Logo className="wym-header-logo"></Logo>
        <div className="wym-movie-search">
          <OnTypeInput value="SEARCH FOR A MOVIE" onSubmit={this.searchByTitle}></OnTypeInput>
          <table className="table is-narrow wym-results">
            <tfoot>
              {movieResultsDiv}
            </tfoot>
          </table>
        </div>
      </div>
      <div className="container wym-content">
        <MovieInfo movie={this.state.currentMovieData}></MovieInfo>
      </div>
    </div>;

  }

  searchByTitle (searchTerm) {

    let movieResults = [];
    let movieResultCounter = 0;

    this.setState({isSearchInProgress: true, movieResultHovered: -1, isStart: false});
    TestMovieData.filter(
      function(movie) {
        if (movie.title.toLowerCase().includes(searchTerm.toLowerCase())){
          movieResults.push(movie);
          movieResultCounter++;
        };
      }
    )

    this.setState({numberOfMovieResults: movieResultCounter});
    this.setState({movieResults: movieResults});

  }

  onMovieSelection (key) {
    this.setState({currentMovieData: this.state.movieResults[key]});
    this.setState({isSearchInProgress: false});
  }

  getMovieResults () {

    let movieResults = [];
    console.log(this.state.isSearchInProgress);
    if(this.state.isSearchInProgress) {
      for (let i = 0; i < this.state.movieResults.length; i++) {
        if(this.state.movieResultHovered == i) {
          console.log("");
          movieResults.push(<SearchResult key={i} active='true' movieResult={this.state.movieResults[i]} onSubmit={this.onMovieSelection}></SearchResult>);
        }
        else {
          movieResults.push(<SearchResult key={i} active='false' movieResult={this.state.movieResults[i]} onSubmit={this.onMovieSelection}></SearchResult>);
        }
      }
    }
    return movieResults;
  }

  onKeyDown(event) {
    if(event.keyCode == 40) {
      if(this.state.movieResultHovered < this.state.numberOfMovieResults-1) {
        let movieResultHovered = this.state.movieResultHovered+1;
        this.setState({movieResultHovered: movieResultHovered});
      }
    }
    if(event.keyCode == 38) {
      if(this.state.movieResultHovered > 0) {
        let movieResultHovered = this.state.movieResultHovered-1;
        this.setState({movieResultHovered: movieResultHovered});
      }
    }
    if(event.keyCode == 13) {
      this.setState({isSearchInProgress: false});
      this.onMovieSelection(this.state.movieResultHovered);
    }
  }

}


render(<App/>, document.getElementById('app'));
