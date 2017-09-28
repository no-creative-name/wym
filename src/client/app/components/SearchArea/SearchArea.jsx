import React from 'react';
import Logo from './components/Logo/Logo.jsx';
import OnTypeInput from './components/OnTypeInput/OnTypeInput.jsx';

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

    render() {

        let movieResultsDiv = this.getMovieResults();

        let headerClass = "container wym-header";
        if (this.state.isStart) {
            headerClass+=" onstart";
        }

        let searchIconClass = "wym-movie-search-icon";
        if (this.state.isSearchInProgress) {
            searchIconClass+="-active";
        }

        return (
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
        )
    }

}