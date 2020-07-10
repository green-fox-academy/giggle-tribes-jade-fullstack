import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Resource from './Resource';

global.fetch = jest.fn(async () => {
  return await Promise.resolve({
    json: () =>
      Promise.resolve({
        resources: [
          {
            type: 'food',
            amount: 6824,
            generation: 1,
            updatedAt: '2020-07-08T18:32:01.000Z',
          },
          {
            type: 'gold',
            amount: 6824,
            generation: 1,
            updatedAt: '2020-07-08T18:32:01.000Z',
          },
        ],
      }),
  });
});

let container;

beforeEach(() => {
  fetch.mockClear();
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders Resource without crashing', async () => {
  await act(async () => {
    render(<Resource kingdomID={1} />, container);
  });
});

it('matches snapeshot', async () => {
  await act(async () => {
    render(<Resource kingdomID={1} />, container);
  });

  expect(container.innerHTML).toMatchInlineSnapshot(
    `"<div class=\\"resources\\"><img class=\\"resource farm\\" src=\\"farm.svg\\" alt=\\"farm icon\\"><div class=\\"resource food\\"><div><h1>6824</h1><img class=\\"food\\" src=\\"FoodIcon.svg\\" alt=\\"food icon\\"></div><p> / minute</p></div><img class=\\"resource mine\\" src=\\"mine.svg\\" alt=\\"mine icon\\"><div class=\\"resource gold\\"><div><h1>6824</h1><img class=\\"gold\\" src=\\"GoldIcon.svg\\" alt=\\"gold icon\\"></div><p> / minute</p></div></div>"`
  );
  //const tree = renderer.create(<Resource kingdomID={1} />).toJSON();

  // expect(tree).toMatchSnapshot();
});
