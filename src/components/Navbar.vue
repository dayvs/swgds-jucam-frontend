<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <!-- Breadcrumb navigation -->
      <span class="breadcrumb-text">
        <router-link class="navbar-brand" to="/">INICIO</router-link>
        <span v-if="currentRouteName"> &gt; {{ currentRouteName.toUpperCase() }}</span>
      </span>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    currentRouteName() {
      return this.$route.name && this.$route.name !== 'LandingPage' ? this.$route.name : '';
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
  text-decoration: none;
}

.breadcrumb-text {
  color: #193238;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 5px; /* Espacio entre "Inicio" y la ruta actual */
}

.navbar-light .navbar-nav .nav-link {
  color: #193238;
}

.breadcrumb-text a {
  text-decoration: none;
  color: #193238;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
}

.breadcrumb-text a:hover {
  text-decoration: underline;
}

</style>