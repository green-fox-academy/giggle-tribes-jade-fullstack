import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import Header from './components/header/Header';
import Resource from './components/resource/Resource';
import Menu from './components/Menu';
import Login from './components/Login';
import Registration from './components/Registration';
import { menuItems } from './components/menuItemsStorage';
import Map from './components/Map';
import Log from './components/Log';
import Buildings from './components/Buildings'

function App() {
  const kingdomName = 'Dummy';

  return (
    <div className="App">
      <Router>

      <Header kingdomName={kingdomName} />
        
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          
          <Route path="/login">
            <Login />
          </Route>

          <Route path="/kingdom/buildings">
            <Buildings />
            </Route>
          
          <Route path='/registration'>
              <Registration />
          </Route>

          <Route exact path='/kingdom/map'>
            <Map kingdomId='5'/>
          </Route>
          
          <Route path="/kingdom">
            <Menu menuItems={menuItems} />
            {menuItems.map(menuItem => (
              <Route
                key={menuItem.link}
                path={'/fandom' + menuItem.link}
                render={() => <menuItem.component name={menuItem.name} />}
              />
            ))}
            <Log />
            <Resource />
        
          </Route>
        
        </Switch>

      </Router>
    </div>
  );
}

export default App;
