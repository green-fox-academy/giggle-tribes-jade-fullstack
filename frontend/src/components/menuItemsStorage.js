import MenuComponent from './MenuComponent';
import Buildings from './buildings/Buildings';
import Academy from './buildings/academy/Academy';

export const menuItems = [
  {
    name: 'Buildings',
    link: '/buildings',
    component: Buildings,
  },
  {
    name: 'Troops',
    link: '/troops',
    component: Academy,
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
