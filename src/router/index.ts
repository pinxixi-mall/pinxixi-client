import { useTabbarStore } from '@/stores'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: 'home',
    meta: {
      title: '首页',
    },
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
    },
    component: () => import('@/views/user/login.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      title: '注册',
    },
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
        meta: {
          title: '首页',
        },
        component: () => import('@/views/home/index.vue')
      },
      {
        path: 'category',
        name: 'category',
        meta: {
          title: '商品分类',
        },
        component: () => import('@/views/category/index.vue')
      },
      {
        path: 'cart',
        name: 'cart',
        meta: {
          title: '购物车',
        },
        component: () => import('@/views/cart/index.vue')
      },
      {
        path: 'mine',
        name: 'mine',
        meta: {
          title: '我的',
        },
        component: () => import('@/views/mine/index.vue')
      }
    ]
  },
  {
      path: '/goods/detail/:id',
      name: '/goods/detail',
      meta: {
        title: '商品详情',
      },
      component: () => import('@/views/goods/detail.vue')
  },
  {
    path: '/order/confirm',
    name: '/order/confirm',
    meta: {
      title: '确认订单',
    },
    component: () => import('@/views/order/confirm.vue')
  },
  {
    path: '/order/detail',
    name: '/order/detail',
    meta: {
      title: '订单详情',
    },
    component: () => import('@/views/order/detail.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from) => {
  // 需要隐藏底部tabbar时在路径传入hide=1
  const { hide } = to.query
  const tabbarStore = useTabbarStore()
  tabbarStore.setTabbarShow(!hide)
})

export default router
