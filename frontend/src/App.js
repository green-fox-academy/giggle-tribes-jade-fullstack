import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import Header from './components/header/Header';
import Resource from './components/resource/Resource';
import Menu from './components/Menu';
import Login from './components/Login';
import Registration from './components/Registration';
import { menuItems } from './components/menuItemsStorage';

function App() {
  const kingdomName = 'Dummy';
  const kingdomID = 1;
  return (
    <div className="App">
      <Header kingdomName={kingdomName} />
      <Router>
        <Switch>

          <Route exact path='/'>
            <Login />
          </Route>
          
          <Route path='/login'>
            <Login />
          </Route>
          
          <Route path='/registration'>
              <Registration />
          </Route>
          
          <Route path='/kingdom'>
            <Menu menuItems={menuItems}/>
            {menuItems.map( (menuItem) => (
              <Route key={menuItem.link} path={'/kingdom' + menuItem.link} render={ () => (<menuItem.component name={menuItem.name} />) } />
            ))}
            <Resource kingdomID={kingdomID} />
          </Route>
        
        </Switch> 
      </Router>
    </div>
  );
}

export default App;
