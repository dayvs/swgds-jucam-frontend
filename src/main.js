import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/styles.css';

// Importar Bootstrap 
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Crear la aplicación Vue, Usar el router y Montar la aplicación
createApp(App).use(router).mount('#app');

// Listener para detectar navegación hacia atrás o adelante
window.addEventListener('popstate', () => {
    // Eliminar el indicador de sesión
    localStorage.removeItem('user');
    // Redirigir al usuario al login
    router.push('/login');
  });