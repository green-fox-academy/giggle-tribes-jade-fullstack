import MenuComponent from './MenuComponent';
import Troops from './troops/Troops';
import BuildingsContainer from './buildings/BuildingsContainer';

export const menuItems = [
  {
    name: 'Buildings',
    link: '/buildings',
    component: BuildingsContainer,
  },
  {
    name: 'Troops',
    link: '/troops',
    component: Troops,
  },
  {
    name: 'Battle',
    link: '/battle',
    component: MenuComponent,
  },
  {
    name: 'Leaderboard',
    link: '/leaderboard',
    component: MenuComponent,
  },
];
