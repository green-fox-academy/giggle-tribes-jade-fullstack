import React from 'react';
import Menu from './components/Menu';
import Login from './components/Login';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/kingdom'>
            <Menu />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
        </Switch> 
      </Router>
    </div>
  );
};

export default App;
