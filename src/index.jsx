import React from 'react';
import { render } from 'react-dom';
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
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      currentMovieData: {
        "key": null,
        "title": "XXX",
        "img": "",
        "duration": 10000,
        "genre": "Generic",
        "plot": [
          {
            "key": "0",
            "text": "XYZ ",
            "timecode": 3000
          }
        ]
      }
    }
    this.saveMovieResultToState = this.saveMovieResultToState.bind(this);
    this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this);
    this.resetMovieInfo = this.resetMovieInfo.bind(this);

  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange() {
    this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
  }

  saveMovieResultToState(movieResult) {
    this.setState({ currentMovieData: movieResult });
  }

  resetMovieInfo() {
    this.setState({ currentMovieData: {"key": null}});
  }

  render() {
    return <div>
      <AboutBox />
      <SearchArea getMovieResults={this.getMovieResults} saveMovieResultToState={this.saveMovieResultToState} resetMovieInfo={this.resetMovieInfo}/>
      <div className="container wym-content">
        <MovieInfo movie={this.state.currentMovieData} key={this.state.currentMovieData.key}></MovieInfo>
      </div>
    </div>;
  }

}

module.hot.accept();

render(<App />, document.getElementById('app'));
