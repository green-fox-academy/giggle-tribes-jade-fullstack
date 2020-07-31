import { mockBuildingProgress } from '../components/mockBuildingProgress';

const readLogEntries = () => {
  return mockBuildingProgress.filter( (e,i) => i < 6);
};

export const logEntryService = {
  readLogEntries,
};
