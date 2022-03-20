import { createRouter, createWebHashHistory } from 'vue-router'

import isAuthenticatedGuard from '../modules/auth/router/auth-guard'

import authLayoutRouter from '../modules/auth/router'
import eventLayoutRouter from '../modules/events/router'

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
    name: 'event-id',
    path: '/event-id/:id',
    component: () =>
      import(
        /* webpackChunkName: "event-id" */ '../modules/events/layout/EventId.vue'
      ),
    props: router => {
      return {
        id: router.params.id
      }
    }
  },

  {
    path: '/calendar',
    name: 'calendar',
    component: () =>
      import(
        /* webpackChunkName: "calendar" */ './../modules/calendar/layout/calendar.vue'
      )
  },

  {
    path: '/profile-user',
    name: 'profileUser',
    beforeEnter: [isAuthenticatedGuard],
    component: () =>
      import(
        /* webpackChunkName: "profileUser" */ '../modules/updateProfile/layout/ProfileUser.vue'
      )
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'page404',
    component: () => import('../components/Page404.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
