import React from 'react';
import {render} from 'react-dom';
import AboutBox from './components/AboutBox/AboutBox.jsx';
import SearchArea from './components/SearchArea/SearchArea.jsx';
import Logo from './components/Logo/Logo.jsx';
import OnTypeInput from './components/OnTypeInput/OnTypeInput.jsx';
import Input from './components/Input/Input.jsx';
import MovieInfo from './components/MovieInfo/MovieInfo.jsx';

import './sass/bulma.sass';
import './sass/index.scss';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
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
    this.selectMovie = this.selectMovie.bind(this);

  }
  
  selectMovie (movieResult) {
    this.setState({currentMovieData: movieResult});
  }



  render () {

    return <div className="total">
      <AboutBox/>
      <SearchArea getMovieResults={this.getMovieResults} selectMovie={this.selectMovie}/>
      <div className="wym-content">
        <MovieInfo movie={this.state.currentMovieData}></MovieInfo>
      </div>
    </div>;

  }

}


render(<App/>, document.getElementById('app'));
