<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <!-- Breadcrumb navigation -->
      <span class="breadcrumb-text">
        <router-link class="navbar-brand" to="/">Inicio</router-link>
        <!-- Iterar sobre cada crumb definido en la ruta -->
        <template v-for="(crumb, index) in breadcrumbs" :key="index">
          <span> &gt; </span>
          <!-- Si se definió una ruta, mostrar como enlace -->
          <router-link
            v-if="crumb.path"
            class="breadcrumb-item"
            :to="crumb.path"
          >
            {{ crumb.label }}
          </router-link>
          <!-- Si no, simplemente mostrar el label -->
          <span v-else class="breadcrumb-item">{{ crumb.label }}</span>
        </template>
      </span>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    breadcrumbs() {
      // Si la ruta actual tiene la propiedad breadcrumb en meta, úsala.
      // Si no, devuelve un arreglo vacío.
      return this.$route.meta && this.$route.meta.breadcrumb
        ? this.$route.meta.breadcrumb
        : [];
    },
  },
};
</script>

<style scoped>

.navbar-brand,
.breadcrumb-item {
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
  gap: 2px; /* Espacio entre "Inicio" y la ruta actual */
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