import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from '@/auth'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {auth: true}
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {auth: false}
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue'),
    meta: {auth: true}
  },
  {
    path: '/authfinalize',
    name: 'authfinalize',
    component: () => import('../views/Authfinalize.vue'),
    meta: {auth: false}
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


router.beforeEach(async (to, from, next) => {

  console.log(`from ${from.fullPath} to ${to.fullPath}`);

  if(!to.meta.auth) {
    console.log("router -- auth NOT Required");
    next();
  } else {
    console.log("router -- auth Required");
    await authGuard(to, from, next);
  } 
  
})

export default router
