import React from 'react';
import Logo from '../Logo/Logo.jsx';
import OnTypeInput from '../OnTypeInput/OnTypeInput.jsx';
import TestMovieData from '../../../../data/movieTest.json';
import SearchResult from '../SearchResult/SearchResult.jsx';

export default class SearchArea extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isSearchInProgress: false,
            isInInitialState: true,
            movieSearchValue: "",
            countOfMovieResults: 0,
            movieResults: [],
            numberOfMovieResultHovered: 0,
            selectedMovieData: {
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

        this.onInput = this.onInput.bind(this);
        this.getMoviesBySearchTerm = this.getMoviesBySearchTerm.bind(this);
        this.getArrayOfSearchResults = this.getArrayOfSearchResults.bind(this);
        this.selectMovie = this.selectMovie.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);  
    }

    onInput (value) {
        if(value == "") {
            this.setState({movieResults: []});
        }
        this.setState({movieSearchValue: value});
        this.setState({isSearchInProgress: true, isInInitialState: false});
    }

    getMoviesBySearchTerm (searchTerm) {

        let movieResults = [];
        let movieResultCounter = 0;

        this.setState({numberOFMovieResultHovered: -1});
        TestMovieData.filter(
            function(movie) {
                if (movie.title.toLowerCase().includes(searchTerm.toLowerCase())){
                movieResults.push(movie);
                movieResultCounter++;
                };
            }
        )

        this.setState({countOfMovieResults: movieResultCounter});
        this.setState({movieResults: movieResults});
    }

    getArrayOfSearchResults () {

        let movieResults = [];

        if(this.state.isSearchInProgress) {
            for (let i = 0; i < this.state.movieResults.length; i++) {
                if(this.state.numberOFMovieResultHovered == i) {
                    movieResults.push(<SearchResult key={i} resultNumber={i} active='true' movieResult={this.state.movieResults[i]} onSubmit={this.selectMovie}></SearchResult>);
                }
                else {
                    movieResults.push(<SearchResult key={i} resultNumber={i} active='false' movieResult={this.state.movieResults[i]} onSubmit={this.selectMovie}></SearchResult>);
                }
            }
        }
        return movieResults;
    }
    
    selectMovie (numberOFMovieResultHovered) {
        
        this.setState({isSearchInProgress: false});
        this.setState({movieSearchValue: this.state.movieResults[numberOFMovieResultHovered].title});
        this.props.selectMovie(this.state.movieResults[numberOFMovieResultHovered]);
    }

    onKeyDown(event) {

        if(event.keyCode == 40) {
            if(this.state.numberOFMovieResultHovered < this.state.countOfMovieResults-1) {
                let numberOFMovieResultHovered = this.state.numberOFMovieResultHovered+1;
                this.setState({numberOFMovieResultHovered: numberOFMovieResultHovered});
            }
        }
        if(event.keyCode == 38) {
            if(this.state.numberOFMovieResultHovered > 0) {
                let numberOFMovieResultHovered = this.state.numberOFMovieResultHovered-1;
                this.setState({numberOFMovieResultHovered: numberOFMovieResultHovered});
            }
        }
        if(event.keyCode == 13) {
            this.selectMovie(this.state.numberOFMovieResultHovered);
        }
    }
    
    render() {

        let movieResultsDiv = this.getArrayOfSearchResults();

        let headerClass = "wym-header";
        if (this.state.isInInitialState) {
            headerClass+=" onstart";
        }

        let searchIconClass = "wym-movie-search-icon";
        if (this.state.isSearchInProgress) {
            searchIconClass+="-active";
        }

        return (
            <div className={headerClass} onKeyDown={this.onKeyDown}>
                <Logo className="wym-header-logo"></Logo>
                <div className="wym-movie-search">
                <span className={searchIconClass}>search</span>
                <OnTypeInput value={this.state.movieSearchValue} onChange={this.onInput} onSubmit={this.getMoviesBySearchTerm}>search</OnTypeInput>
                <table className="table is-narrow wym-results">
                    <tfoot>
                    {movieResultsDiv}
                    </tfoot>
                </table>
                </div>
            </div>
        )
    }

}