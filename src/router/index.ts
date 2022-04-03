import { useTabbarStore } from '@/stores'
import { getToken, isEmpty } from '@/utils'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { NO_TOKEN_PATH } from '@/config/constants'
import { Toast } from 'vant'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: 'home',
    meta: {
      title: '首页'
    },
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    component: () => import('@/views/user/login.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      title: '注册'
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
          title: '首页'
        },
        component: () => import('@/views/home/index.vue')
      },
      {
        path: 'category',
        name: 'category',
        meta: {
          title: '商品分类'
        },
        component: () => import('@/views/category/index.vue')
      },
      {
        path: 'cart',
        name: 'cart',
        meta: {
          title: '购物车'
        },
        component: () => import('@/views/cart/index.vue')
      },
      {
        path: 'mine',
        name: 'mine',
        meta: {
          title: '我的'
        },
        component: () => import('@/views/mine/index.vue')
      }
    ]
  },
  {
    path: '/goods/detail/:id',
    name: '/goods/detail',
    meta: {
      title: '商品详情'
    },
    component: () => import('@/views/goods/detail.vue')
  },
  {
    path: '/order/confirm',
    name: '/order/confirm',
    meta: {
      title: '确认订单'
    },
    component: () => import('@/views/order/confirm.vue')
  },
  {
    path: '/order/detail',
    name: '/order/detail',
    meta: {
      title: '订单详情'
    },
    component: () => import('@/views/order/detail.vue')
  },
  {
    path: '/order/payment',
    name: '/order/payment',
    meta: {
      title: '支付结果'
    },
    component: () => import('@/views/order/payment.vue')
  },
  {
    path: '/order/list/:status',
    name: '/order/list',
    meta: {
      title: '我的订单'
    },
    component: () => import('@/views/order/list.vue')
  },
  {
    path: '/mine/address',
    name: '/mine/address',
    meta: {
      title: '地址管理'
    },
    component: () => import('@/views/mine/address.vue')
  },
  {
    path: '/mine/address-edit',
    name: '/mine/address-edit',
    meta: {
      title: '地址编辑'
    },
    component: () => import('@/views/mine/address-edit.vue')
  },
  {
    path: '/mine/account',
    name: '/mine/account',
    meta: {
      title: '账号管理'
    },
    component: () => import('@/views/mine/account.vue')
  },
  {
    path: '/mine/reset-pwd',
    name: '/mine/reset-pwd',
    meta: {
      title: '修改密码'
    },
    component: () => import('@/views/mine/password-reset.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  // 需要隐藏底部tabbar时在路径传入hide=1
  const { path, query: { hide } } = to
  const tabbarStore = useTabbarStore()
  tabbarStore.setTabbarShow(!hide)
  // 高亮tabbar
  tabbarStore.setTabbarActive(path)

  if (NO_TOKEN_PATH.includes(path) || !isEmpty(getToken())) {
    next()
  } else {
    Toast('未登录')
    next({ name: 'login' })
  }
})

export default router
