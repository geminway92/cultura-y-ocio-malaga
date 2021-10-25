import { createRouter, createWebHashHistory } from 'vue-router'

import authLayoutRouter from '../modules/auth/router'
import eventLayoutRouter from '../modules/events/router'

const routes = [

  {
    path: '/',
    ...authLayoutRouter
  },
  {
    path: '/eventlayout',
    ...eventLayoutRouter
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
