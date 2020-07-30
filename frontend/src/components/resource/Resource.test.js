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

let foodAmount;
let goldAmount;

function setFoodAmount(amount) {
  foodAmount = amount;
  console.log(foodAmount);
}
function setGoldAmount(amount) {
  goldAmount = amount;
}

it('matches snapeshot', async () => {
  await act(async () => {
    await render(
      <Resource
        kingdomID={1}
        foodAmount={foodAmount}
        setFoodAmount={setFoodAmount}
        goldAmount={goldAmount}
        setGoldAmount={setGoldAmount}
      />,
      container
    );
  });

  expect(container.innerHTML).toMatchSnapshot();
});
