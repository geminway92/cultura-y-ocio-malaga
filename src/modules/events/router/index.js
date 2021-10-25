

export default {
  
  name: 'eventlayout',
  component: () => import(/*webpackChunkName: "eventlayout"*/ '../../events/layout/EventLayout.vue'),
  
}



// {
//   path: '/:pathMatch(.*)*',
//   name: 'page404',
//   component: () => import('../../../components/Page404.vue')
// }
