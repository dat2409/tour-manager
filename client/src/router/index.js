import Vue from 'vue'
import VueRouter from 'vue-router'
import DashBoard from '../views/Dashboard.vue'
import Projects from '../views/Projects.vue'
import Team from '../views/Team.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashBoard',
    component: DashBoard
  },
  {
    path: '/team',
    name: 'team',
    component: Team
  },
  {
    path: '/projects',
    name: 'projects',
    component: Projects
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
