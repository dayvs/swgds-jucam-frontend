<template>
  <div class="empleados-page" style="background-color: #F6F8F9;">
    <div class="container py-5">
      <PanelControl />
      <!-- Puedes agregar contenido adicional aquí si lo necesitas -->
    </div>
  </div>
</template>

<script>
import PanelControl from '../components/PanelControl.vue';

export default {
  name: 'EmpleadoDashboard',
  components: {
    PanelControl,
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