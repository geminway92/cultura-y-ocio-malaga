import { createRouter, createWebHashHistory } from 'vue-router';

import isAuthenticatedGuard from '../modules/auth/router/auth-guard';

import authLayoutRouter from '../modules/auth/router';
import eventLayoutRouter from '../modules/events/router';

const routes = [
   {
      path: '/',
      ...authLayoutRouter
   },
   {
      path: '/eventlayout',
      beforeEnter: [isAuthenticatedGuard],
      ...eventLayoutRouter
   },
   {
      path: '/profile-user',
      name: 'profileUser',
      component: () =>
         import(
            /*webpackChunkName: "profileUser" */ '../modules/events/views/ProfileUser.vue'
         )
   },
   {
      path: '/:pathMatch(.*)*',
      name: 'page404',
      component: () => import('../components/Page404.vue')
   }
];

const router = createRouter({
   history: createWebHashHistory(),
   routes
});

export default router;
