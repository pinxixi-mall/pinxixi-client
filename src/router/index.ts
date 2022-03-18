import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: 'home',
    component: () => import('@/views/home/home.vue')
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
        component: () => import('@/views/home/home.vue')
      },
      {
        path: 'category',
        name: 'category',
        component: () => import('@/views/category/category.vue')
      },
      {
        path: 'cart',
        name: 'cart',
        component: () => import('@/views/cart/cart.vue')
      },
      {
        path: 'mine',
        name: 'mine',
        component: () => import('@/views/mine/mine.vue')
      }
    ]
  },
  {
      path: '/detail/:id',
      name: 'detail',
      component: () => import('@/views/commodity/detail.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
