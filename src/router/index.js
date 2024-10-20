import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../views/LandingPage.vue';
import Donar from '../views/Donar.vue';
import Servicios from '../views/Servicios.vue';
import Login from '../views/Login.vue';
import EmpleadoDashboard from '../views/EmpleadoDashboard.vue';


const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage,
  },
  {
    path: '/donar',
    name: 'Donar',
    component: Donar,
  },
  {
    path: '/servicios',
    name: 'Servicios',
    component: Servicios,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/empleados',
    name: 'EmpleadoDashboard',
    component: EmpleadoDashboard,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Protección de rutas
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const isAuthenticated = localStorage.getItem('user');
    if (isAuthenticated) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

export default router;