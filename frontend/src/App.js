import React from 'react';
import Menu from './components/Menu';
import Login from './components/Login';
import Map from './components/Map';
import Log from './components/Log';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { menuItems } from './components/menuItemsStorage';

function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/'>
            <Login />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route exact path='/kingdom/map'>
            <Map kingdomId='5'/>
          </Route>
          <Route path='/kingdom'>
            <Menu menuItems={menuItems}/>
            {menuItems.map( (menuItem) => (
              <Route key={menuItem.link} path={'/kingdom' + menuItem.link} render={ () => (<menuItem.component name={menuItem.name} />) } />
            ))}
            <Log />
          </Route>
        </Switch> 
      </Router>
    </div>
  );
};

export default App;
