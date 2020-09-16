import React from 'react';
import { Router as Router, Route} from 'react-router-dom';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Login from './Login';
import { createMemoryHistory } from 'history';
import { render, fireEvent } from '@testing-library/react';

const history = createMemoryHistory({
    initialEntries: ['/']
  });
  
let container;

const mockStore = configureStore([]);
const mockedStore = mockStore({});

const login = renderer.create(
    <Router history={history}>
        <Route path = '/'>
            <Provider store={mockedStore}>
              <Login />
            </Provider>
        </Route>
    </Router>,
    container
  )

  let utils = ()=>{return render(
    <Router history={history}>
        <Route path = '/'>
          <Provider store={mockedStore}>
            <Login />
          </Provider>
        </Route>
    </Router>
);}

  it('renders correctly', () => {
    mockedStore.dispatch = jest.fn(); 
    login.toJSON();
    expect(login).toMatchSnapshot();
  });


// let className = (classname) => {return utils().getElementsByClassName(classname)}
let fieldByPlaceholderName = (placeholder) => {return utils().getByPlaceholderText(placeholder)}

it('shows error message', async() => {
  // let field = className("errorMessage")
  let inputfield = fieldByPlaceholderName("Username" && "Password")
  container = document.createElement('div');
  document.body.appendChild(container);
fireEvent.change(inputfield, {target: {value: ""}})
expect(container.classname("All fields are required.").toBe(true))
});
