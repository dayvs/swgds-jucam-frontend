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
      <!-- Botón “Regresar” con ícono -->
      <div class="mt-2">
        <button @click="goBack"
                class="btn btn-link p-0 d-flex align-items-center">
          <i class="fas fa-arrow-left"></i>
          <span class="ms-1">Regresar</span>
        </button>
      </div>
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
  methods: {
    goBack() {
      // Regresa a la página anterior del historial
      this.$router.back();
    }
  }
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
  gap: 5px; 
}

.breadcrumb-text .navbar-brand {
  margin-right: 0 !important;
  padding-right: 0 !important;
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

.btn-link {
  color: #193238;
  font-weight: 500;
  text-decoration: none
}

.btn-link:hover {
  text-decoration: none;
  color: #193238;
}

.btn-link i {
  font-size: 1rem;
}

</style>