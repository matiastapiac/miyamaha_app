import Dealers from '../screens/Dealers';
import Documents from '../screens/Documents';
import Guarantees from '../screens/Guarantees';
import Maintenance from '../screens/Maintenance';
import News from '../screens/News';
import {images} from './images';

export const screen = {
  Login: 'Login',
  Registration: 'Registration',
  ForgotPassword: 'ForgotPassword',
  DashBoard: 'DashBoard',
  News: 'News',
  Maintenance: 'Maintenance',
  Dealers: 'Dealers',
  Documents: 'Documents',
  Guarantees: 'Guarantees',
};

export const bottomStack = [
  {
    id: 1,
    label: 'Novedades',
    name: screen.News,
    component: News,
    icon: images.news,
  },
  {
    id: 2,
    label: 'Mi Garage',
    name: screen.Maintenance,
    component: Maintenance,
    icon: images.tools,
  },
  {
    id: 3,
    label: 'Distribuidores',
    name: screen.Dealers,
    component: Dealers,
    icon: images.dealer,
  },
  {
    id: 4,
    label: 'Documentos',
    name: screen.Documents,
    component: Documents,
    icon: images.folder,
  },
  {
    id: 5,
    label: 'Garantías',
    name: screen.Guarantees,
    component: Guarantees,
    icon: images.policy,
  },
];

export const curousel = [
  images.img1,images.img2,images.img3
]