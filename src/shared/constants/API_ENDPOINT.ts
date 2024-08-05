const API_ENDPOINT = {
  AUTH: {
    PATH: '/auth',
    REGISTER: '/register',
    LOGIN: '/login',
    REFRESH: '/refresh',
    LOGOUT: '/logout',
  },

  LOCATIONS: {
    PATH: '/api/location',
    GET_REGION: '/',
    GET_PROVINCE: '/:region',
    GET_MUNICIPALITY: '/:region/:province',
    GET_BARANGAY: '/:region/:province/:municipality',
  },

  USERS: {
    PATH: '/api/users', // The default in index.js
    CREATE: '/',
    READ: '/',
    UPDATE: '/:id',
    DELETE: '/:id',
    ID: '/:id',
  },

  BRANCHES: {
    PATH: '/api/branches',
    CREATE: '/',
    READ: '/',
    UPDATE: '/:id',
    DELETE: '/:id',
    ID: '/:id',

    // Custom request
    GET_ALL: '/all',
  },
};

export { API_ENDPOINT };
