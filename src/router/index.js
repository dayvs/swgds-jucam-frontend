import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../views/LandingPage.vue';
import Donar from '../views/Donar.vue';
import DonacionExito from '../views/DonacionExito.vue';
import DonacionError from '../views/DonacionError.vue';
import Servicios from '../views/Servicios.vue';
import Login from '../views/Login.vue';
import EmpleadoDashboard from '../views/EmpleadoDashboard.vue';
import AdministrarEmpleados from '../views/AdministrarEmpleados.vue';
import EmpleadoDetalle from '../views/EmpleadoDetalle.vue';
import Reportes from '../views/Reportes.vue';



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
    path: '/donacionexito', 
    name: 'DonacionExito', 
    component: DonacionExito,
    meta: { hideNavbar: true },
  },
  { 
    path: '/donacionerror', 
    name: 'DonacionError', 
    component: DonacionError,
    meta: { hideNavbar: true }, 
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
    name: 'Empleados',
    component: EmpleadoDashboard,
    meta: { 
      requiresAuth: true,
      breadcrumb: [
        { label: 'Empleados', path: '/empleados' }
      ]
    },
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdministrarEmpleados,
    meta: { 
      requiresAuth: true,
      breadcrumb: [
        { label: 'Empleados', path: '/empleados' },
        { label: 'Admin', path: '/admin' }
      ]
    },
  },
  {
    path: '/admin/:usuarioId',
    name: 'Empleado',
    component: EmpleadoDetalle,
    meta: { 
      requiresAuth: true,
      breadcrumb: [
        { label: 'Empleados', path: '/empleados' },
        { label: 'Admin', path: '/admin' },
        { label: 'Empleado' }  
      ]
    },
  },
  {
    path: '/reportes',
    name: 'Reportes',
    component: Reportes,
    meta: { 
      requiresAuth: true,
      breadcrumb: [
        { label: 'Empleados', path: '/empleados' },
        { label: 'Reportes', path: '/reportes' }
      ]
    },
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