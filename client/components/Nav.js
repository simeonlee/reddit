import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Home extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="nav">
        <div className="brand">Reddit Unleashed</div>
      </div>
    )
  }
}