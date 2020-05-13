import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/msite',
  },
  {
    path: '/msite',
    component: () => import('@/views/Msite/Msite.vue'),
    meta: {
      showFooter: true
    }
  },
  {
    path: '/search',
    component: () => import('@/views/Search/Search.vue'),
    meta: {
      showFooter: true
    }
  },
  {
    path: '/order',
    component: () => import('@/views/Order/Order.vue'),
    meta: {
      showFooter: true
    }
  },
  {
    path: '/profile',
    component: () => import('@/views/Profile/Profile.vue'),
    meta: {
      showFooter: true
    }
  },
  {
    path: '/login',
    component: () => import('@/views/Login/Login.vue')
  },
  {
    path: '/shop',
    component: () => import('@/views/Shop/Shop.vue'),
    children: [
      {
        path: '/shop/goods',
        component: () => import('@/views/Shop/ShopGoods/ShopGoods.vue')
      },
      {
        path: '/shop/ratings',
        component: () => import('@/views/Shop/ShopRatings/ShopRatings.vue')
      },
      {
        path: '/shop/info',
        component: () => import('@/views/Shop/ShopInfo/ShopInfo.vue')
      },
      {
        path: '',
        redirect: '/shop/goods'
      }
    ]
  },
  {
    path: '/userinfo',
    component: () => import('@/views/UserInfo/UserInfo')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
