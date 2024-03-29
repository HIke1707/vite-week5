import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/frontend/UserLayout.vue'),
      children: [
        {
          path: '',
          name: 'userhome',
          component: () => import('../views/frontend/UserHome.vue'),
        },
        {
          path: 'products',
          name: 'products',
          component: () => import('../views/frontend/FrontProductsList.vue')
        },
        {
          path: 'cart',
          name: 'cart',
          component: () => import('../views/frontend/FrontCart.vue')
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/frontend/UserLayout.vue'),
      children: [
        {
          path: '',
          name: 'adminproducts',
          component: () => import('../views/backend/AdminProductList.vue'),
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
      path: '/:catchAll(.*)*',
      component: () => import('../views/NotFound.vue')
    }
  ]
})

export default router
