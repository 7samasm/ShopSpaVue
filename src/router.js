import Vue from 'vue'
import Router from 'vue-router'
import login from './views/admin/login.vue';
import Home from './views/Home'
import productDetails from './views/product-details'
import myProducts from './views/admin/myProducts'
import addProduct from './views/admin/addProduct'
import editProduct from './views/admin/editProduct';
import cart from './views/admin/cart'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/admin/login',
      name: 'Login',
      component: login
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/product-details/:id',
      name: 'Product Details',
      component: productDetails
    },
    //admin
    {
      path: '/admin/my-product',
      name: 'my products',
      component: myProducts
    },    
    {
      path: '/admin/add-product',
      name: 'Add product',
      component: addProduct
    },
    {
      path: '/admin/edit-product/:id',
      name: 'Update product',
      component: editProduct
    },    
    {
      path: '/admin/cart',
      name: 'Cart',
      component: cart
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
