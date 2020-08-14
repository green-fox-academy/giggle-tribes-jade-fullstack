import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { menuItems } from './components/menuItemsStorage';

import './App.css';
import Header from './components/header/Header';
import Resource from './components/resource/Resource';
import Academy from './components/academy/Academy';
import Menu from './components/Menu';
import Login from './components/Login';
import Map from './components/Map';
import Log from './components/Log';

function App() {
  const kingdomName = 'Dummy';

  const academyLevel = 1;
  const troopLimit = 100;

  return (
    <div className="App">
      <Header kingdomName={kingdomName} />
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/kingdom/map">
            <Map />
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
            <Resource />
            <Academy troopLimit={troopLimit} academyLevel={academyLevel} />
            <Log />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
