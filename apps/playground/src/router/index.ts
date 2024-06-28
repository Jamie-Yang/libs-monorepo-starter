import type { RouteRecordRaw } from 'vue-router'

import { createRouter, createWebHistory } from 'vue-router'

import { setupRouterGuard } from './guard'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/demo-component',
  },
  {
    path: '/demo-component',
    component: () => import('../views/demo-component.vue'),
    meta: {
      title: 'demo-component',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

setupRouterGuard(router)

export default router
