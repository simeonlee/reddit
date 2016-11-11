import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Home extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div className="intro">
          <div className="intro-name">Reddit</div>
          <div className="intro-inspiration">the things you are passionate about are not random,</div>
          <div className="intro-inspiration">they are your calling</div>
        </div>
      </div>
    )
  }
}