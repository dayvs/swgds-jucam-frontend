<template>
  <div class="empleados-page" style="background-color: #F6F8F9;">
    <div class="container py-5">
      <h3 class="section-title">Empleados</h3>
      <h1 class="main-title mt-4">Iniciaste sesión correctamente</h1>
      <div class="construction mt-4">
        <i class="fas fa-tools mr-2"></i>Sitio en construcción
      </div>
      <button class="btn btn-primary mt-5" @click="logout">Cerrar sesión</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmpleadoDashboard',
  methods: {
    logout() {
      // Lógica para cerrar sesión
      localStorage.removeItem('user');
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
.section-title {
  color: #193238;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
}

.main-title {
  color: #193238;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
}

.construction {
  color: #193238;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 1.25rem;
}

.btn-primary {
  background-color: #17C6ED;
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  border: none;
}

</style>