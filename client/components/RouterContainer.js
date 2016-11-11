import React, { Component } from 'react';
// import Nav from './Nav'

export default class RouterContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        {/*<Nav />*/}
        {this.props.children}
      </div>
    )
  }
}