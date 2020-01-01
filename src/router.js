import Vue from 'vue'
import Router from 'vue-router'
import {store} from './store/store'

Vue.use(Router)

const router = new Router({
mode: 'history',
base: process.env.BASE_URL,
routes: [
    {
      path: '/admin/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "about" */ './views/admin/register')
    },  
    {
      path: '/admin/login',
      name: 'Login',
      component: () => import(/* webpackChunkName: "about" */ './views/admin/login')
    },
    {
      path: '/',
      name: 'Home',
      component: () => import(/* webpackChunkName: "about" */ './views/Home')
    },
    {
      path: '/product-details/:id',
      name: 'Product Details',
      component: () => import(/* webpackChunkName: "about" */ './views/product-details')
    },
    {
      path: '/sections/:section',
      name: 'sections',
      component: () => import(/* webpackChunkName: "about" */ './views/sections')
    },    
    //admin
    {
      path: '/admin/my-product',
      name: 'my products',
      meta: {requiresAuth : true},
      component: () => import(/* webpackChunkName: "about" */ './views/admin/myProducts')
    },    
    {
      path: '/admin/add-product',
      name: 'Add product',
      meta: {requiresAuth : true},
      component: () => import(/* webpackChunkName: "about" */ './views/admin/addProduct')
    },
    {
      path: '/admin/edit-product/:id',
      name: 'Update product',
      meta: {requiresAuth : true},
      component: () => import(/* webpackChunkName: "about" */ './views/admin/editProduct')
    },    
    {
      path: '/admin/cart',
      name: 'Cart',
      meta: {requiresAuth : true},
      component: () => import(/* webpackChunkName: "about" */ './views/admin/cart')
    },    
    {
      path: '/oclocks',
      name: 'Oclocks',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Oclocks')
    }
  ]
})



router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            next()
            return
        }
        next('/admin/login')
    } else {
        next()
    }
})
export default router
