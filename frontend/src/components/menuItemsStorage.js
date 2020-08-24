import MenuComponent from './MenuComponent';
import Troops from './troops/Troops';

export const menuItems = [
  {
    name: 'Buildings',
    link: '/buildings',
    component: MenuComponent,
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
    link: '/lederboard',
    component: MenuComponent,
  },
];
