import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/about'>About</Link></li>
            <li><Link to='/subtopics'>Topics</Link></li>
          </ul>

          <hr/>

          <Route path='/' exact component={Home}/>
          <Route path='/about' component={About}/>
          <Route path='/subtopics' component={Topics}/>
        </div>
      </Router>
    );
  }
}

const Home = () => {
  return (
    <div>
      Home
    </div>
  )
}

const About = () => {
  return (
    <div>
      About
    </div>
  )
}

const Topics = ({match}) => {
  return (
    <div>
      Topics
        <ul>
          <li><Link to={`${match.url}/lifecycle-events`}>Lifecycle Events</Link></li>
          <li><Link to={`${match.url}/props-v-state`}>Props V State</Link></li>
          <li><Link to={`${match.url}/rendering`}>Rendering</Link></li>
        </ul>
        <Route path={`${match.url}/:topicId`} component={Topic}/>
        <Route exact path={match.url} render={() => (
          <h4>Please select a topic</h4>
        )}/>
    </div>
  )
}

const Topic = ({match}) => {
  console.log(match);
  return (
    <div>
      {match.params.topicId}
    </div>
  )
}

export default App;
