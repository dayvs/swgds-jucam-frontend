<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <!-- Enlace a INICIO -->
      <router-link class="navbar-brand" to="/">INICIO</router-link>
      <!-- Mostrar ruta actual -->
      <span v-if="currentRouteName" class="breadcrumb-text"> &gt; {{ currentRouteName.toUpperCase() }}</span>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    currentRouteName() {
      return this.$route.name !== 'LandingPage' ? this.$route.name : '';
    },
  },
};
</script>

<style scoped>

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