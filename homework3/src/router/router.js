import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../components/MainView.vue'
import LoginView from '../components/LoginView.vue'
import AddPost from '../components/AddPost.vue'
import ContactsView from '../components/ContactsView.vue'
import PostView from '../components/PostView.vue'

const routes = [
  { path: '/', name: 'home', component: MainView, meta: {requiresAuth: true} },
  { path: '/login',name: 'login', component: LoginView },
  { path: '/add-post', name: 'addPost', component: AddPost, meta: { requiresAuth: true } },
  { path: '/contact', name: 'contact', component: ContactsView },
  { path: '/post/:id', name: 'post', component: PostView, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router