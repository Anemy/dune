import React, { Component } from 'react';
import './App.css';

import DuneContainer from './components/DuneContainer';

class App extends Component {
  componentWillMount() {
    this.updateDimensions();
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions.bind(this));
  }

  updateDimensions() {
    let width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;

    let height = window.innerHeight
      || document.documentElement.clientHeight
      || document.body.clientHeight;

    this.setState({
      width: width < height ? width : height,
      height: width < height ? width : height
    });
  }

  render() {
    const {
      width, height
    } = this.state;

    return (
      <div className="App">
        <DuneContainer
          height={height}
          width={width}
        />
      </div>
    );
  }
}

export default App;
