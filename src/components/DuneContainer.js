// import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Dunes from '../utils/Dunes';

const d3 = require('d3');

class DuneContainer extends Component {
  static propTypes = {
    height: PropTypes.number,
    width: PropTypes.number
  };

  static defaultProps = {
    height: 500,
    width: 500
  };

  componentDidMount() {
    this.refreshDunes();
  }

  componentDidUpdate() {
    this.refreshDunes();
  }

  clearDunes() {
    d3.select(this.svgContainerRef)
      .selectAll('*')
      .remove();

    this.rendered = false;

    console.log('Cleared dunes.');
  }

  createDunes() {
    const { width, height } = this.props;

    const dunes = new Dunes();

    dunes.renderDunes(width, height, d3.select(this.svgContainerRef));

    this.rendered = true;

    console.log('Created dunes.');
  }

  refreshDunes() {
    if (this.rendered) {
      this.clearDunes();
    }

    this.createDunes();
  }

  rendered = false;
  svgContainerRef = null;

  render() {
    const {
      width, height
    } = this.props;

    return (
      <svg
        className="dunes-svg"
        height={height}
        ref={ref => this.svgContainerRef = ref}
        width={width}
      />
    );
  }
}

export default DuneContainer;
