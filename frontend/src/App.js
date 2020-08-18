import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import Header from './components/header/Header';
import Resource from './components/resource/Resource';
import Academy from './components/academy/Academy';
import Menu from './components/Menu';
import Login from './components/Login';
import Registration from './components/Registration';
import { menuItems } from './components/menuItemsStorage';
import Map from './components/Map';
import Log from './components/Log';

function App() {
  const kingdomName = 'Dummy'; //Dummy until Login component is missing
  const academyLevel = 1; //Dummy until Building component is missing

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
            <Resource />
            <Academy academyLevel={academyLevel} />
            <Log />
          </Route>
        
        </Switch>
      </Router>
    </div>
  );
}

export default App;
