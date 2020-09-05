import MenuComponent from './MenuComponent';
import Troops from './troops/Troops';
import Buildings from './buildings/Buildings';

export const menuItems = [
  {
    name: 'Buildings',
    link: '/buildings',
    component: Buildings,
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
