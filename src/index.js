import './styles.css';
import './views/registration-view.js';
import './views/home-view.js';
import './views/dashboard-view.js';

import { Router } from '@vaadin/router';

window.addEventListener('load', () => { 
  initRouter();
});

function initRouter() {
  const router = new Router(document.querySelector('main')); 


  router.setRoutes([
    {
      path: '/',
      component: 'login-view',
      action: () =>
        import(/* webpackChunkName: "not-found-view" */ './views/login-view')
    },

    {
      path: '/registration', 
      component: 'registration-view',
      action: () =>
        import(/* webpackChunkName: "not-found-view" */ './views/registration-view')
    },

    {
      path: '/dashboard', 
      component: 'dashboard-view',
      action: () =>
        import(/* webpackChunkName: "not-found-view" */ './views/dashboard-view')
    },

    {
      path: '/home', 
      component: 'home-view',
      action: () =>
        import(/* webpackChunkName: "not-found-view" */ './views/home-view')
    },

    {
      path: '/jobs', 
      component: 'jobs-view',
      action: () =>
        import(/* webpackChunkName: "not-found-view" */ './views/jobs-view')
    }

  ]);
}