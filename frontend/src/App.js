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
// import BuildingsContainer from './components/buildings/BuildingsContainer'
// import AddBuilding from './components/buildings/AddBuilding';

function App() {
  localStorage.setItem(
    'TRIBES_TOKEN',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjMsImlhdCI6MTU5ODA0MTk3Mn0.cVAcR4UiobKN05oicJYQYPIkibMws4yIATb8GVuVD_g'
  );

  return (
    <div className="App">
      <Router>

      <Header />
        
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

          <Route exact path="/kingdom/map">
            <Map />
          </Route>

          <Route path="/kingdom">
            <Menu menuItems={menuItems} />
            {menuItems.map(menuItem => (
              <Route
                key={menuItem.link}
                path={'/kingdom' + menuItem.link}
                render={() => <menuItem.component name={menuItem.name} />}
              />
            ))}
            <Resource />
            <Log />
          </Route>
        </Switch>

      </Router>
    </div>
  );
}

export default App;
