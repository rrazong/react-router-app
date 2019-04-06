import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/page-exists'>Page exists</Link></li>
            <li><Link to='/deprecated-page'>Deprecated page, redirects to an existing page</Link></li>
            <li><Link to='/user/123'>User page got user 123</Link></li>
            <li><Link to='/page-does-not-exist'>Page does not exist</Link></li>
            <li><Link to='/also/does/not/exist'>Page also does not exist</Link></li>
          </ul>

          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/page-exists' component={PageExists}/>
            <Route path='/user/:userId' component={User}/>
            <Redirect from='/deprecated-page' to='/page-exists'/>
            <Route component={PageNotFound}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

const Home = () => (<div>Home</div>);
const PageExists = () => (<div>Page OK</div>);
const User = (props) => (<div>User Page - id {props.match.params.userId}</div>);

class PageNotFound extends Component {
  render() {
    return (
      <div>
        Page Not Found: {this.props.location.pathname}
      </div>
    )
  }
}

export default App;
