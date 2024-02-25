import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/UserLayout.vue'),
      children: [
        {
          path: '',
          name: 'userhome',
          component: () => import('../views/UserHome.vue'),
        },
        {
          path: 'products',
          name: 'products',
          component: () => import('../views/FrontProductsList.vue')
        },
        {
          path: 'cart',
          name: 'cart',
          component: () => import('../views/FrontCart.vue')
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/UserLayout.vue'),
      children: [
        {
          path: '',
          name: 'adminproducts',
          component: () => import('../views/AdminProductList.vue'),
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Login.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
