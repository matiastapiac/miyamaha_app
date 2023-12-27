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
  SerachDealers: 'SerachDealers',
  EditProfile: 'EditProfile',
  ScheduleMaintenance: 'ScheduleMaintenance',
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

export const ONESIGNAL_APP_ID = '28128a11-c593-4cab-99bf-fec96290d21b';

export const BASEURL = 'https://apimiyamaha.handy.cl/User/';

export const endpoints = {
  login: 'login',
  forgot_password: 'forgot-password',
  register: 'register',
  register_rejected_new_motorcycle: 'register-rejected-new-motorcycle',
  register_rejected_old_motorcycle: 'register-rejected-old-motorcycle',
  profile: 'profile',
  recover_password: 'recover-password',
  change_password: 'change-password',
  device_token: 'device-token',
  documents: 'documents',
  folders: 'folders',
  news: 'news',
  maintenance_urls: 'maintenance-urls',
  maintenance_certificate: 'maintenance-certificate',
  lost_documents: 'lost-documents',
  post_sale: 'post-sale',
  distributors: 'distributors',
  warranty_manual: 'warranty-manual',
  document_types: 'document-types',
  post_sale_reasons: 'post-sale-reasons',
};

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

export const devices = [
  {
    id: 1,
    title: 'Agendar via web',
    subTitle: 'Agenda de manera cómoda y simple a través de nuestro canal web.',
    icon: images.pc,
  },
  {
    id: 2,
    title: 'Agendar via teléfono',
    subTitle: 'Comunícate con una de nuestras operadoras para agendar tu cita.',
    icon: images.telephone,
  },
  {
    id: 3,
    title: 'Agendar via Whatsapp',
    subTitle: 'Chatea con una de nuestras operadoras para agendar tu cita.',
    icon: images.whatsapp,
  },
];

export const chileRegions = [
  'Antofagasta',
  'Araucanía',
  'Arica y Parinacota',
  'Atacama',
  'Aysén',
  'Biobío',
  'Coquimbo',
  'La Araucanía',
  'Lo Barnechea',
  'Los Ángeles',
  'Los Lagos',
  'Los Ríos',
  'Magallanes',
  'Maule',
  'Metropolitana',
  "O'Higgins",
  'Ñuble',
  'Tarapacá',
  'Valparaíso',
  'San Felipe',
  'Estación Central',
];

export const chileCities = [
  'Arica',
  'Calama',
  'CHICUREO',
  'Chillán',
  'Concepción',
  'Copiapó',
  'Coyhaique',
  'Curicó',
  'Estación Central',
  'Huechuraba',
  'Iquique',
  'La Florida',
  'La Serena',
  'Las Condes',
  'Ñuñoa',
  'Osorno',
  'Ovalle',
  'Peñalolen',
  'Providencia',
  'Puerto Montt',
  'Punta Arenas',
  'Quillota',
  'Rancagua',
  'San Bernardo',
  'Santiago',
  'Santiago Centro',
  'Talca',
  'Temuco',
  'Valdivia',
  'Valparaíso',
  'Viña Del Mar',
  'Vitacura',
];
