import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../components/MainView.vue'
import LoginView from '../components/LoginView.vue'

const routes = [
  { path: '/', component: MainView },
  { path: '/login', component: LoginView },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router