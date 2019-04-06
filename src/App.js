import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Redirect, withRouter} from 'react-router-dom';

class App extends Component {
  render() {
    const routes = [
      {
        name: 'Complaints',
        path: '/complaints',
        component: Complaints,
        getInitialData: () => {console.log('Get data for complaints')},
      },
      {
        name: 'Access Codes',
        path: '/access-codes',
        component: AccessCodes,
        getInitialData: () => {console.log('Get data for access codes')},
      }
    ];

    return (
      <Router>
        <div className="App">
          <h2>Created by Router</h2>
          <ul>
            {
              routes.map(({path, name}) => (
                <li key={name}>
                  <Link to={path}>{name}</Link>
                </li>
              ))
            }
          </ul>

          {
            routes.map(({path, component: Component, getInitialData}) => {
              // const component = (props) => (<Component {...props} getInitialData={getInitialData}/>);
              return (
                <Route key={path} path={path} render={(props) => (<Component {...props} getInitialData={getInitialData}/>)}/>
              );
            })
          }
          <hr/>
          <h2>Not created by Router</h2>
          <span>So, this.props.history does not exist</span>
          <AccessCodes getInitialData={() => {console.log('Get data for access codes')}}/>
          <hr/>
          <h2>Created by withRouter</h2>
          <BetterAccessCodes getInitialData={() => {console.log('Get data for better access codes')}}/>
        </div>
      </Router>
    );
  }
}

class Complaints extends Component {
  state = {
    goToAccessCodes: false,
  }

  componentWillMount() {
    this.props.getInitialData();
  }

  handleClickToAccessCodes = () => {
    this.setState({goToAccessCodes: true})
  }

  render() {
    console.log('state is', this.state);
    return (
      <div>
        { this.state.goToAccessCodes &&
          <Redirect to='/access-codes'/>
        }
        Complaints module
        <button onClick={this.handleClickToAccessCodes}>Go to Access Codes</button>
      </div>
    );
  }
}

class AccessCodes extends Component {
  componentWillMount() {
    this.props.getInitialData();
  }

  handleClickToComplaints = () => {
    this.props.history.push('/complaints');
  }

  render() {
    return (
      <div>
        Access Codes module
        <button onClick={this.handleClickToComplaints}>Go to Complaints</button>
      </div>
    );
  }
}

const BetterAccessCodes = withRouter(AccessCodes);

export default App;
