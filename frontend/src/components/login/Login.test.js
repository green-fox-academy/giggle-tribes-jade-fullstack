import React from 'react';
import { Router as Router, Route} from 'react-router-dom';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Login from './Login';
import { createMemoryHistory } from 'history';

const history = createMemoryHistory({
    initialEntries: ['/']
  });

it('renders correctly', () => {
    const mockStore = configureStore([]);
    const mockedStore = mockStore({
      });
      mockedStore.dispatch = jest.fn();
      
    const tree = renderer.create(
        <Router history={history}>
            <Route path = '/'>
                <Provider store={mockedStore}>
                    <Login />
                </Provider>
            </Route>
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
