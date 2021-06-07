
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Home/Index.vue') },
      { path: '/patients', component: () => import('src/pages/Home/Patient.vue') },
      { path: '/records', component: () => import('src/pages/Home/Records.vue') },
      { path: '/settings', component: () => import('src/pages/Home/Settings.vue') },
    ]
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
