<template>
  <!-- Primer modal: Cambio de contraseña -->
  <div
    class="modal"
    tabindex="-1"
    :class="{ 'show d-block': visible && !showSuccessModal }"
    v-if="visible || showSuccessModal"
    style="background-color: rgba(0, 0, 0, 0.5);"
  >
    <div class="modal-dialog" v-if="!showSuccessModal">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Cambia tu contraseña</h5>
        </div>
        <div class="modal-body">
          <form @submit.prevent="guardar">
            <div class="mb-3">
              <label for="oldPassword" class="form-label">Introduce tu contraseña anterior:</label>
              <input type="password" id="oldPassword" v-model="oldPassword" class="form-control" required>
            </div>
            <div class="mb-3">
              <label for="newPassword" class="form-label">Introduce tu nueva contraseña:</label>
              <input type="password" id="newPassword" v-model="newPassword" class="form-control" required>
              <div v-if="errorNewSame" class="text-danger mt-1">{{ errorNewSame }}</div>
            </div>
            <div class="mb-3">
              <label for="confirmPassword" class="form-label">Confirma tu nueva contraseña:</label>
              <input type="password" id="confirmPassword" v-model="confirmPassword" class="form-control" required>
              <div v-if="errorNotMatch" class="text-danger mt-1">{{ errorNotMatch }}</div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="cerrar">Cerrar</button>
              <button type="submit" class="btn btn-primary">Guardar</button>
            </div>
            <div v-if="serverError" class="text-danger text-center mt-2">{{ serverError }}</div>
          </form>
        </div>
      </div>
    </div>

    <!-- Segundo modal: Confirmación de contraseña actualizada -->
    <div
      class="modal-dialog modal-dialog-centered"
      v-else
    >
      <div class="modal-content text-center">
        <div class="modal-header">
          <button type="button" class="btn-close" @click="cerrarSuccessModal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <h5 class="modal-title">{{ successMessage }}</h5>          
        </div>
        <div class="d-flex justify-content-center">
          <button type="button" class="btn btn-primary" @click="cerrarSuccessModal">Cerrar</button>
        </div>
        <P></P>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CambioContrasenaModal',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    userEmail: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      errorNewSame: '',
      errorNotMatch: '',
      serverError: '',
      showSuccessModal: false,
      successMessage: ''
    };
  },
  methods: {
    cerrar() {
      // Cerrar sesión y redirigir al login
      localStorage.removeItem('user');
      this.$router.push('/login');
    },
    async guardar() {
      // Resetear errores
      this.errorNewSame = '';
      this.errorNotMatch = '';
      this.serverError = '';

      // Validar que la nueva contraseña sea diferente de la antigua
      if (this.oldPassword === this.newPassword) {
        this.errorNewSame = "La nueva contraseña no puede ser la misma que la contraseña anterior";
        return;
      }
      // Validar que la nueva contraseña y la confirmación coincidan
      if (this.newPassword !== this.confirmPassword) {
        this.errorNotMatch = "La contraseña no coincide";
        return;
      }
      
      // Petición al endpoint para cambiar contraseña
      try {
        const response = await axios.put('https://swgds-jucam-backend.onrender.com/usuarios/cambiar-password', {
          email: this.userEmail,
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
          confirmPassword: this.confirmPassword
        });
        if (response.status === 200) {
          // En vez de alert, mostramos el segundo modal de éxito
          this.successMessage = "Contraseña actualizada correctamente. Inicia sesión con tu nueva contraseña.";
          this.showSuccessModal = true;
        }
      } catch (error) {
        if (error.response && error.response.data) {
          this.serverError = error.response.data;
        } else {
          this.serverError = "No se pudo guardar tu nueva contraseña, intenta de nuevo más tarde";
        }
      }
    },
    cerrarSuccessModal() {
      // Cerrar sesión y redirigir al login
      localStorage.removeItem('user');
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.modal-dialog {
  margin-top: 10%;
}
.modal-title {
  color: #193238;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
}
.form-label {
  color: #193238;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
}
.form-control {
  background-color: #EBEDED;
  border: none;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
}
.btn-primary {
  background-color: #17C6ED;
  color: #FFFFFF;
  border: none;
}
.btn-secondary {
  background-color: #EBEDED;
  color: #193238;
  border: none;
}
.text-danger {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
}
</style>