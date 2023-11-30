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
  Profile: 'Profile',
  Notification: 'Notification',
  SalesForm: 'SalesForm',
  MyDocuments: 'MyDocuments',
  DocumentRequest: 'DocumentRequest',
  Manuals: 'Manuals',
  DocumentList: 'DocumentList',
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

export const curousel = [images.img1, images.img2, images.img3];

export const documents = [
  {
    id: 1,
    name: 'Mis Documentos',
    description: 'Explora entre tus carpeta y documentos guardados.',
    icon: images.folder,
  },
  {
    id: 2,
    name: 'Documentos Extraviados',
    description: 'Solicita algún documento especial',
    icon: images.file,
  },
  {
    id: 3,
    name: 'Manuales',
    description: 'Descarga los manuales de tu moto.',
    icon: images.manual,
  },
];

export const guarantees = [
  {
    id: 1,
    name: 'Manual de Garantias',
    description:
      'Auí encontraras todas las garantías que Yamaha tiene para ti.',
    icon: images.policy,
  },
  {
    id: 2,
    name: 'Post Venta',
    description:
      'Si necesitas ayuda, comunicate con una de nuestras ejecutivas post-venta.',
    icon: images.help,
  },
];

export const notifications = [
  {
    id: 1,
    title: 'Sucursal Vitacura Cerrado',
    description:
      'Estimado cliente, queremos informarles que nuestra sucursal de Av. Vitacura se en...',
    date: '12/10/22',
  },
  {
    id: 2,
    title: 'Tus documentos ya están disponibles',
    description:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis en...',
    date: '12/08/22',
  },
  {
    id: 3,
    title: 'Finibus Bonorum et Malorum',
    description:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis en...',
    date: '01/07/22',
  },
];

export const bikes = [images.yamaha1, images.yamaha2];

export const data = [
  {key: '1', value: 'Test1'},
  {key: '2', value: 'Test2'},
  {key: '3', value: 'Test3'},
  {key: '4', value: 'Test4'},
  {key: '5', value: 'Test5'},
];

export const manuals = [
  {
    id: 1,
    title: 'R1 - Manual de mantenimiento',
    description:
      'Indicaciones del fabricante para el mantenimiento de tu motocicleta',
    icon: images.book,
  },
  {
    id: 2,
    title: 'R1 - Manual de usuario',
    description: 'Instrucciones y guías para el uso adecuado de tu motocicleta',
    icon: images.book,
  },
  {
    id: 3,
    title: 'Tracer 9 GT - Manual de mantenimiento',
    description:
      'Indicaciones del fabricante para el mantenimiento de tu motocicleta',
    icon: images.book,
  },
  {
    id: 4,
    title: 'Tracer 9 GT - Manual de usuario',
    description: 'Instrucciones y guías para el uso adecuado de tu motocicleta',
    icon: images.book,
  },
];

export const myDocuments = [
  {
    id: 1,
    name: 'Documentos Seguro',
    type: 'folder',
    files: ['Seguro obligatorio.jpg', 'Póliza de seguro.jpg'],
  },
  {id: 2, name: 'R1', type: 'folder'},
  {id: 3, name: 'Tracer', type: 'folder'},
  {id: 4, name: 'Mapa Argentina.pdf', type: 'pdf'},
  {id: 5, name: 'Copia carnet conducir.jpg', type: 'pdf'},
];
