import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SpecifyParticipants from '../views/SpecifyParticipants.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/participants',
    name: 'SpecifyParticipants',
    component:SpecifyParticipants
  }
]

const router = new VueRouter({
  routes
})

export default router
