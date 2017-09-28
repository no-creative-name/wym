import React from 'react';
import {render} from 'react-dom';
import AboutBox from './components/AboutBox/AboutBox.jsx';
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
      isSearchInProgress: false,
      isStart: true,
      movieSearchValue: "",
      movieResults: [],
      movieResultHovered: 0,
      numberOfMovieResults: 0,
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
    this.onMovieSearchInput = this.onMovieSearchInput.bind(this);
    this.searchByTitle = this.searchByTitle.bind(this);
    this.selectMovie = this.selectMovie.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);

  }

  onMovieSearchInput (value) {
    if(value == "") {
      this.setState({movieResults: []});
    }
    this.setState({movieSearchValue: value});
    this.setState({isSearchInProgress: true, isStart: false});
  }

  searchByTitle (searchTerm) {

    let movieResults = [];
    let movieResultCounter = 0;

    this.setState({movieResultHovered: -1});
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

  selectMovie (key) {
    this.setState({currentMovieData: this.state.movieResults[key]});
    this.setState({movieSearchValue: this.state.movieResults[key].title});
    this.setState({isSearchInProgress: false});
  }

  getMovieResults () {

    let movieResults = [];

    if(this.state.isSearchInProgress) {
      for (let i = 0; i < this.state.movieResults.length; i++) {
        if(this.state.movieResultHovered == i) {
          movieResults.push(<SearchResult key={i} resultNumber={i} active='true' movieResult={this.state.movieResults[i]} onSubmit={this.selectMovie}></SearchResult>);
        }
        else {
          movieResults.push(<SearchResult key={i} resultNumber={i} active='false' movieResult={this.state.movieResults[i]} onSubmit={this.selectMovie}></SearchResult>);
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
      this.selectMovie(this.state.movieResultHovered);
    }
  }

  render () {

    return <div className="total" onKeyDown={this.onKeyDown}>
      <AboutBox />
      <div className={headerClass}>
        <Logo className="wym-header-logo"></Logo>
        <div className="wym-movie-search">
          <span className={searchIconClass}>search</span>
          <OnTypeInput value={this.state.movieSearchValue} onChange={this.onMovieSearchInput} onSubmit={this.searchByTitle}>search</OnTypeInput>
          <table className="table is-narrow wym-results">
            <tfoot>
              {movieResultsDiv}
            </tfoot>
          </table>
        </div>
      </div>
      <div className="wym-content">
        <MovieInfo movie={this.state.currentMovieData}></MovieInfo>
      </div>
    </div>;

  }

}


render(<App/>, document.getElementById('app'));
