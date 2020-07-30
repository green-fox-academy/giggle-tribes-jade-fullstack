import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import Log from './Log';
jest.mock('../services/logEntryService');
import { logEntryService } from '../services/logEntryService';

const mockBuildingProgress = [
  {
      "subject": "mockfarm",
      "level": 1,
      "action": "build",
      "started_at": 1595962228515,
      "finished_at": 1595962301594,
      "progress_at": 1595962301000
  },
  {
      "subject": "mockacademy",
      "level": 2,
      "action": "upgrade",
      "started_at": 12345789,
      "finished_at": 12347000,
      "progress_at": 12346980
  },
  {
      "subject": "mocktroop",
      "level": 1,
      "action": "build",
      "started_at": 12345789,
      "finished_at": 12399999,
      "progress_at": 12348200
  },
  {
      "subject": "mocktroop",
      "level": 2,
      "action": "upgrade",
      "started_at": 12345789,
      "finished_at": 12399999,
      "progress_at": 12399999
  },
  {
      "subject": "mockfarm",
      "level": 1,
      "action": "build",
      "started_at": 12345789,
      "finished_at": 12399999,
      "progress_at": 12399999
  },
  {
      "subject": "mocktroop",
      "level": 2,
      "action": "upgrade",
      "started_at": 12345789,
      "finished_at": 12399999,
      "progress_at": 12366400
  },
  {
      "subject": "mockfarm 7",
      "level": 1,
      "action": "build",
      "started_at": 12345789,
      "finished_at": 12399999,
      "progress_at": 12366400
  }
]

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('matches snapshot', async () => {
  logEntryService.readLogEntries.mockImplementation(() => {
    return mockBuildingProgress.filter( (e,i) => i < 6).map( e => {
      e.started_at = (e.started_at + new Date().getTimezoneOffset()*60*1000);
      return e;
    });
  });
  await act(async () => {
    render(<Log />, container);
  });

  expect(container.innerHTML).toMatchSnapshot();
});
