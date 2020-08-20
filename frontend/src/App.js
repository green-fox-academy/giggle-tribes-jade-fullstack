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
import AddBuilding from './components/buildings/AddBuilding';

function App() {
  const kingdomID = 3;
  localStorage.setItem('TRIBES_TOKEN', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjMsImtpbmdkb21JRCI6NCwiaWF0IjoxNTk2MDU0OTE1fQ.-CZDK-BlkE24wWk4lCpEOp6WcGJMMNJTap0vSQKK8NA');
  const goldAmount = 500;

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

          <Route path="/kingdom/buildings">
            <Buildings />
            </Route>
          
          <Route path='/registration'>
              <Registration />
          </Route>

          <Route exact path='/kingdom/map'>
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
            <Log />
            <Resource kingdomID={kingdomID} />
            <AddBuilding goldAmount={goldAmount} kingdomId={kingdomID}/>
          </Route>
        
        </Switch>

      </Router>
    </div>
  );
}

export default App;
