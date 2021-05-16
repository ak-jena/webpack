import './styles.css';
import './views/registration-view.js';
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
      path: '(.*)', 
      component: 'registration-view',
      action: () =>
        import(/* webpackChunkName: "not-found-view" */ './views/registration-view')
    }
  ]);
}