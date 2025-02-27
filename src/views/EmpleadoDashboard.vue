<template>
  <div class="empleados-page" style="background-color: #F6F8F9;">
    <div class="container py-5">
      <PanelControl />
      <!-- Aquí puedes agregar contenido adicional si lo necesitas -->
    </div>
    <!-- Modal forzado para cambio de contraseña -->
    <CambioContrasenaModal 
      v-if="mostrarCambio" 
      :visible="mostrarCambio" 
      :userEmail="user.email" />
  </div>
</template>

<script>
import PanelControl from '../components/PanelControl.vue';
import CambioContrasenaModal from '../components/CambioContrasenaModal.vue';

export default {
  name: 'EmpleadoDashboard',
  components: {
    PanelControl,
    CambioContrasenaModal
  },
  data() {
    return {
      mostrarCambio: false,
      user: {}
    };
  },
  mounted() {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      this.user = storedUser;
      // Si el usuario requiere cambio de contraseña, mostrar el modal
      if (storedUser.requiereCambio) {
        this.mostrarCambio = true;
      }
    }
  }
};
</script>

<style scoped>
/* Puedes conservar tus estilos existentes */
</style>