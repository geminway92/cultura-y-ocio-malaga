import { createRouter, createWebHashHistory } from 'vue-router'

import authLayoutRouter from '../modules/auth/router'

const routes = [

  {
    path: '/',
    ...authLayoutRouter
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
