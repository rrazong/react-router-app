import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

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
        </div>
      </Router>
    );
  }
}

class Complaints extends Component {
  componentWillMount() {
    this.props.getInitialData();
  }

  render() {
    return (
      <div>
        Complaints module
      </div>
    );
  }
}

class AccessCodes extends Component {
  componentWillMount() {
    this.props.getInitialData();
  }

  render() {
    return (
      <div>
        Access Codes module
      </div>
    );
  }
}

export default App;
