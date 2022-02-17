
export default {

  name: 'authlayout',
  component: () => import(/* webpackChunkName: "login" */ '../layout/AuthLayout.vue'),
  children: [
    {
      path: '',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
    },
    {
      path: '/forgetpassword',
      name: 'forgetpassword',
      component: () => import(/* webpackChunkName: "forgetpassword" */ '../views/ForgetPassword.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'page404',
      component: () => import('../../../components/Page404.vue')
    }
  ]
}
