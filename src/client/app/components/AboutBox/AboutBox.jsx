import React from 'react';

export default class AboutBox extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            infoBoxToggled: false
        }

        this.toggleHelp = this.toggleHelp.bind(this);
    }
    
    toggleHelp () {
        if(!this.state.infoBoxToggled) {
            this.setState({infoBoxToggled: true});
        }
        else {
            this.setState({infoBoxToggled: false});
        }
    }

    render () {
        

    let topHeaderClass = "wym-top-header";
    let topHeaderText = "What is WYM?";

    if (this.state.infoBoxToggled) {
      topHeaderClass+=" helpToggled";
      topHeaderText="WYM (What You Missed) is an useful tool for everyone. You want to know what happened in a movie until the moment you just zapped in? Here you go. #NoMoreSpoilers";
    }
        return (
            <div onClick={this.toggleHelp} className="wym-top-header">
                {topHeaderText}
            </div>
        )
    }

}