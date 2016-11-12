import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Home extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="nav">
        <Link to="/" className="nav-link">/r/all</Link>
        <Link to="/" className="brand">Reddit Unleashed</Link>
        <Link to="/" className="nav-link">subscribed</Link>
      </div>
    )
  }
}