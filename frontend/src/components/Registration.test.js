import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Registration from './Registration';
import { Router as Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const history = createMemoryHistory({
    initialEntries: ['/']
  });


let utils =  ()=>{return render(
    <Router history={history}>
        <Route path = '/'>
            <Registration />
        </Route>
    </Router>
);}

let fieldByPlaceholderName = (placeholder) => {return utils().getByPlaceholderText(placeholder)}

it('username or kingdomname field is blank line is red', async() =>{
    let field = fieldByPlaceholderName("Username" || "Kingdomname")
    fireEvent.change(field, {target: {value: ""}})
    expect(field.className).toBe("red")
});

it('username or kingdomname field is not blank line is green', async() =>{
    let field = fieldByPlaceholderName("Username" || "Kingdomname")
    fireEvent.change(field, {target: {value: "a"}})
    expect(field.className).toBe("green")
});

it('password field is min 8 chars line is green', async() =>{
    let passwordField = fieldByPlaceholderName("Password")
    fireEvent.change(passwordField, {target: {value: "12345678"}})
    expect(passwordField.className).toBe("green")
});

it('password field is less then 8 chars line is red', async() =>{
    let passwordField = fieldByPlaceholderName("Password")
    fireEvent.change(passwordField, {target: {value: "1234567"}})
    expect(passwordField.className).toBe("red")
});
