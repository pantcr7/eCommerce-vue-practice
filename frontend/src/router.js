import { createRouter, createWebHistory } from 'vue-router'
import { session } from './data/session'
import { userResource } from '@/data/user'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home.vue'),
    meta: { requiresLogin: false },
    redirect: { name: 'ProductListPage' },
  },
  {
    path: '/products', 
    name: 'ProductListPage',
    component: () => import('@/pages/Products.vue'),
  },
  {
    path: '/products/:name',
    name: 'ProductDetailPage',
    component: () => import('@/pages/ProductDetail.vue'),
  },
  {
    name: 'Login',
    path: '/account/login',
    component: () => import('@/pages/Login.vue'),
  },
  {
    name: 'CheckoutPage',
    path: '/checkout',
    component: () => import('@/pages/Checkout.vue'),
    meta: { requiresLogin: true },
  }
]

let router = createRouter({
  history: createWebHistory('/frontend'),
  routes,
})

router.beforeEach(async (to, from, next) => {
  let isLoggedIn = session.isLoggedIn
  try {
    await userResource.promise
  } catch (error) {
    isLoggedIn = false
  }

  if(to.meta.requiresLogin && !isLoggedIn) {
    next({ name: 'Login' })
  }
  next()
})

export default router
