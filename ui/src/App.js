import React, {Component} from 'react';
import Accepted from './views/Accepted';
import Invited from './views/Invited';
import {
  BrowserRouter,
  Switch,
  Route,
  NavLink
} from "react-router-dom";

import './App.css';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <div className="App container">
            <nav>
              <ul>
                <li>
                  <NavLink activeClassName="active" exact to="/invited">Invited</NavLink>
                </li>
                <li>
                  <NavLink activeClassName="active" exact to="/accepted">Accepted</NavLink>
                </li>
              </ul>
            </nav>
            <Switch>
              <Route path="/accepted">
                <Accepted />
              </Route>
              <Route path="/">
                <Invited />
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
