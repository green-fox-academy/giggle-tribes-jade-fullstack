import React from 'react';
import Menu from './components/Menu';
import Login from './components/Login';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import MenuComponent from './components/MenuComponent';

function App() {

  const menuItems = [
    {
        name: 'Buildings',
        link: '/buildings',
        component: MenuComponent
    },
    {
        name: 'Troops',
        link: '/troops',
        component: MenuComponent
    },
    {
        name: 'Battle',
        link: '/battle',
        component: MenuComponent
    },
    {
        name: 'Leaderboard',
        link: '/lederboard',
        component: MenuComponent
    }
  ];

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/kingdom'>
            <Menu menuItems={menuItems}/>
            {menuItems.map( (menuItem) => (
                <Route key={menuItem.link} path={'/kingdom' + menuItem.link} render={ () => (<menuItem.component name={menuItem.name} />) } />
            ))}
          </Route>
        </Switch> 
      </Router>
    </div>
  );
};

export default App;
