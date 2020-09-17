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
    </Router>,
    container
);}

  it('renders correctly', () => {
    mockedStore.dispatch = jest.fn(); 
    login.toJSON();
    expect(login).toMatchSnapshot();
  });


  let fieldByPlaceholderName = (placeholder) => {return utils().getByPlaceholderText(placeholder)}
  
  it('either input field empty shows error message', async() => {
    let inputfield = fieldByPlaceholderName("Username" || "Password")
    fireEvent.change(inputfield, {target: {value: ""}})
    const text = utils(/required/i);
    expect(text.baseElement).toBeInTheDocument();
  });

  it('both input field empty shows error message', async() => {
    let inputfield = fieldByPlaceholderName("Username" && "Password")
    fireEvent.change(inputfield, {target: {value: ""}})
    const text = utils(/required/i);
    expect(text.baseElement).toBeInTheDocument();
  });
