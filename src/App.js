import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to={{
              pathname: '/user/123',
              state: {
                from: 'home',
                trackingId: 'abcd-234',
              }
            }}>User page got user 123</Link></li>
          </ul>

          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/user/:userId' component={User}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

const Home = () => (<div>Home</div>);
const User = (props) => (
  <div>
    <h1>User Page - id {props.match.params.userId}</h1>
    <p>from {props.location.state.from}</p>
    <p>tracking id {props.location.state.trackingId}</p>
  </div>
);

export default App;
