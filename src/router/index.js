import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Freehand from '../views/Freehand.vue'
import FreehandImage from '../views/FreehandImage.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/freehand',
    name: 'Freehand',
    component: Freehand
  },
  {
    path: '/freehandimage',
    name: 'Freehandimage',
    component: FreehandImage
  },
]

const router = new VueRouter({
  routes
})

export default router
