import React, { Component } from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import RouterContainer from './RouterContainer';
import Home from './Home';

export default class App extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Router history={browserHistory}>
          <Route path="/" component={RouterContainer}>
            <IndexRoute component={Home}/>
            {/*<Route path="/" component={Home}/>*/}
          </Route>
        </Router>
      </div>
    )
  }
}