import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: 'home',
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/user/login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/user/register.vue')
  },
  {
    path: '/',
    name: 'layout',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/index.vue')
      },
      {
        path: 'category',
        name: 'category',
        component: () => import('@/views/category/index.vue')
      },
      {
        path: 'cart',
        name: 'cart',
        component: () => import('@/views/cart/index.vue')
      },
      {
        path: 'mine',
        name: 'mine',
        component: () => import('@/views/mine/index.vue')
      }
    ]
  },
  {
      path: '/goods/detail/:id',
      name: '/goods/detail',
      component: () => import('@/views/goods/detail.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
