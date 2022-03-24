export default {
  name: 'eventlayout',
  component: () =>
    import(
      /* webpackChunkName: "eventlayout" */ '../../events/layout/EventLayout.vue'
    ),
  children: [

    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'eventlayout' }
    }
  ]
}
