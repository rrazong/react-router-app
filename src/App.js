import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Switch, Redirect, withRouter} from 'react-router-dom';
import auth from './auth';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <AuthButton />
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/logIn'>Log In</Link></li>
            <li><Link to='/dashboard'>Dashboard (protected)</Link></li>
          </ul>
          <hr/>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/logIn' component={Login} />
            <PrivateRoute path='/dashboard' component={Dashboard}/>
            <Route render={() => (<h1>Four Oh Four</h1>)} />
          </Switch>
        </div>
      </Router>
    );
  }
}
class PrivateRoute extends Component {
  render() {
    const { component: Component, ...rest} = this.props;
    return (
      <Route {...rest} render={(props) => (
        auth.isAuthenticated
          ? <Component {...props} />
          : <Redirect to={{
            pathname: '/login',
            state:  {
              from: props.location,
            }
          }} />
      )}/>
    )
  }
}

const Home = () => (<h1>Home</h1>);

const Dashboard = () => (<h1>Dashboard (protected)</h1>);

class Login extends Component {
  state = {
    redirectToReferer: false,
    login: '',
  }

  onChangeLogin = (event) => {
    const login = event.target.value;
    this.setState(() => ({login}));
  }

  onClickLogin = () => {
    const {login} = this.state;
    console.log('logging in as:', login);
    auth.authenticate({login})
      .then(() => {
        this.setState(() => ({redirectToReferer: true}));
      })
  }

  render() {
    if (this.state.redirectToReferer) {
      const {from} = this.props.location.state || {from: '/'}
      return (
        <Redirect to={from} />
      );
    }

    return (
      <div>
        <h1>Login</h1>
        <input type='text' placeholder='your login' onChange={this.onChangeLogin} />
        <button onClick={this.onClickLogin}>Log in</button>
      </div>
     );
  }
}

const AuthButton = withRouter(({history}) => {
  return auth.isAuthenticated
    ? (
      <p>
        Welcome
        <button
          onClick={() => {
            auth.signOut().then(() => {
              history.push('/');
            });
          }}>
          Sign Out
        </button>
      </p>
    )
    : (
      <p>
        You are not logged in.
      </p>
    )
});

export default App;
