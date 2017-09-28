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

        this.onMovieSearchInput = this.onInput.bind(this);
        this.searchByTitle = this.getMoviesBySearchTerm.bind(this);
        this.getMovieResults = this.getArrayOfSearchResults.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);  
    }

    onInput (value) {
        if(value == "") {
            this.setState({movieResults: []});
        }
        this.setState({movieSearchValue: value});
        this.setState({isSearchInProgress: true, isStart: false});
    }

    getMoviesBySearchTerm (searchTerm) {

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

        this.props.getMovieResults(movieResults);

    }

    getArrayOfSearchResults () {

        let movieResults = [];

        if(this.state.isSearchInProgress) {
            for (let i = 0; i < this.state.movieResults.length; i++) {
                if(this.state.movieResultHovered == i) {
                    movieResults.push(<SearchResult key={i} resultNumber={i} active='true' movieResult={this.state.movieResults[i]} onSubmit={this.props.selectMovie}></SearchResult>);
                }
                else {
                    movieResults.push(<SearchResult key={i} resultNumber={i} active='false' movieResult={this.state.movieResults[i]} onSubmit={this.props.selectMovie}></SearchResult>);
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
            this.props.selectMovie(this.state.movieResultHovered);
        }
    }
    
    render() {

        let movieResultsDiv = this.getArrayOfSearchResults();

        let headerClass = "container wym-header";
        if (this.state.isStart) {
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