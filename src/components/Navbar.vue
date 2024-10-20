<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <!-- Enlace a INICIO -->
      <router-link class="navbar-brand" to="/">INICIO</router-link>
      <!-- Mostrar "> LOGIN" cuando la ruta actual es 'Login' -->
      <span v-if="currentRouteName === 'Login'" class="breadcrumb-text"> &gt; LOGIN</span>
      <!-- Mostrar "> SERVICIOS" cuando la ruta actual es 'Servicios'" -->
      <span v-else-if="currentRouteName === 'Servicios'" class="breadcrumb-text"> &gt; SERVICIOS</span>
      <!-- Puedes agregar más condiciones para otras rutas -->
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },
};
</script>

<style scoped>
/* Tus estilos existentes */
.navbar-brand {
  color: #193238;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 1rem;
}

.navbar-light .navbar-nav .nav-link {
  color: #193238;
}

.breadcrumb-text {
  color: #193238;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
}
</style>