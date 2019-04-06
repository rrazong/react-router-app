import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <ul>
            <li><Link to='/netflix/123'>Netflix</Link></li>
            <li><Link to='/amazon/xyz'>Amazon</Link></li>
            <li><Link to='/yahoo/234-2342-222111'>Yahoo</Link></li>
            <li><Link to='/auth0/foo/bar'>Auth0</Link></li>
          </ul>

          <Route path={'/:site/:id'} component={Child}/>
        </div>
      </Router>
    );
  }
}

const Child = ({match}) => {
  console.log(match);
  const {site, id} = match.params;
  return (
    <div>
      <div>SITE: {site}</div>
      <div>ID: {id}</div>
    </div>
  )
}

export default App;
