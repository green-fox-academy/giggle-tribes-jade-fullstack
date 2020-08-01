import React from 'react';
import { render } from '@testing-library/react';
import Registration from './Registration';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const container = document.createElement('div');
document.body.appendChild(container);

it('duma', async() =>{
    await render(
        <Router>
            <Route path = './registration'>
                <Registration />, container
            </Route>
        </Router>);
});
