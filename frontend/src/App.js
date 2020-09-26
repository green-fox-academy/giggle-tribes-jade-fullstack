import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import Header from './components/header/Header';
import Resource from './components/resource/Resource';
import Menu from './components/Menu';
import Login from './components/login/Login';
import Registration from './components/Registration';
import { menuItems } from './components/menuItemsStorage';
import Map from './components/Map';
import Log from './components/Log';
import NotImplemented from './components/notImplemented/NotImplemented';

function App() {

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

          <Route path="/">
            <NotImplemented />
          </Route>


        </Switch>

      </Router>
    </div>
  );
}

export default App;
