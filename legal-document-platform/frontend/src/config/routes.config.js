export const routesConfig = {
  public: {
    home: '/',
    login: '/login',
    register: '/register',
    about: '/about',
    contact: '/contact',
    pricing: '/pricing',
    templates: '/templates',
    templateDetail: '/templates/:id',
    faq: '/faq',
    knowledgeBase: '/knowledge-base',
  },

  private: {
    dashboard: '/dashboard',
    profile: '/profile',
    documents: '/documents',
    createDocument: '/documents/create',
    editDocument: '/documents/:id/edit',
    documentDetail: '/documents/:id',
    signDocument: '/documents/:id/sign',
    consultations: '/consultations',
    bookConsultation: '/consultations/book',
    payment: '/payment/checkout',
    paymentSuccess: '/payment/success',
    paymentFailure: '/payment/failure',
  },

  admin: {
    dashboard: '/admin',
    users: '/admin/users',
    documents: '/admin/documents',
    analytics: '/admin/analytics',
    settings: '/admin/settings',
  },

  error: {
    notFound: '/404',
    serverError: '/500',
  },
};

export const getRoute = (path, params = {}) => {
  let route = path;
  Object.keys(params).forEach(key => {
    route = route.replace(`:${key}`, params[key]);
  });
  return route;
};
