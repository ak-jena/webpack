import './styles.css';
import './views/registration-view.js';
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
      path: '/home', 
      component: 'dashboard-view',
      action: () =>
        import(/* webpackChunkName: "not-found-view" */ './views/dashboard-view')
    }

  ]);
}