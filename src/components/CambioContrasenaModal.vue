<template>
  <!-- Contenedor que muestra UNO u OTRO modal según el estado -->
  <div
    class="modal"
    tabindex="-1"
    :class="{ 'show d-block': visible }"
    v-if="visible"
    style="background-color: rgba(0, 0, 0, 0.5);"
  >
    <!-- Si NO se ha guardado la nueva contraseña, se muestra el primer modal -->
    <div class="modal-dialog" v-if="!showSuccessModal">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Cambia tu contraseña</h5>
          <!-- Eliminamos el botón "X" para que NO cierre el modal prematuramente -->
        </div>
        <div class="modal-body">
          <form @submit.prevent="guardar">
            <div class="mb-3">
              <label for="oldPassword" class="form-label">Introduce tu contraseña anterior:</label>
              <input 
                type="password" 
                id="oldPassword" 
                v-model="oldPassword" 
                class="form-control" 
                required
              >
            </div>
            <div class="mb-3">
              <label for="newPassword" class="form-label">Introduce tu nueva contraseña:</label>
              <input 
                type="password" 
                id="newPassword" 
                v-model="newPassword" 
                class="form-control" 
                required
              >
              <div v-if="errorNewSame" class="text-danger mt-1">{{ errorNewSame }}</div>
            </div>
            <div class="mb-3">
              <label for="confirmPassword" class="form-label">Confirma tu nueva contraseña:</label>
              <input 
                type="password" 
                id="confirmPassword" 
                v-model="confirmPassword" 
                class="form-control" 
                required
              >
              <div v-if="errorNotMatch" class="text-danger mt-1">{{ errorNotMatch }}</div>
            </div>
            <div class="modal-footer">
                <!-- Botón "Cerrar" forzará cierre de sesión y a /login -->
                <div class="d-flex justify-content-center">
                <button 
                  type="button" 
                  class="btn btn-secondary me-2" 
                  @click="cerrar"
                >
                  Cerrar
                </button>
                <!-- Botón "Guardar" ejecuta guardar() -->
                <button 
                  type="submit" 
                  class="btn btn-primary"
                >
                  Guardar
                </button>
              </div>
            </div>
            <div v-if="serverError" class="text-danger text-center mt-2">
              {{ serverError }}
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Si SÍ se guardó la nueva contraseña, se muestra el segundo modal de confirmación -->
    <div
      class="modal-dialog modal-dialog-centered"
      v-else
    >
      <div class="modal-content text-center">
        <div class="modal-header">
          <!-- Único botón para cerrar y redirigir al login -->
          <button 
            type="button" 
            class="btn-close" 
            @click="cerrarSuccessModal" 
            aria-label="Close"
          >
          </button>
        </div>
        <div class="modal-body">
          <h5 class="modal-title">{{ successMessage }}</h5>
        </div>
        <div class="d-flex justify-content-center mb-3">
          <button 
            type="button" 
            class="btn btn-primary mt-3" 
            @click="cerrarSuccessModal"
          >
            Cerrar
          </button>
        </div>
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
    // Botón "Cerrar" del primer modal
    cerrar() {
      // Quita la sesión y vete a /login
      localStorage.removeItem('user');
      this.$router.push('/login');
    },
    // Método que llama "Guardar" (PUT /usuarios/cambiar-password)
    async guardar() {
      // Limpiar mensajes de error
      this.errorNewSame = '';
      this.errorNotMatch = '';
      this.serverError = '';

      // Validar que la nueva contraseña sea diferente de la anterior
      if (this.oldPassword === this.newPassword) {
        this.errorNewSame = "La nueva contraseña no puede ser la misma que la contraseña anterior";
        return;
      }
      // Validar que coincidan
      if (this.newPassword !== this.confirmPassword) {
        this.errorNotMatch = "La contraseña no coincide";
        return;
      }

      try {
        const response = await axios.put(
          'https://swgds-jucam-backend.onrender.com/usuarios/cambiar-password', 
          {
            email: this.userEmail,
            oldPassword: this.oldPassword,
            newPassword: this.newPassword,
            confirmPassword: this.confirmPassword
          }
        );

        // Si el servidor retorna 200, mostramos el SEGUNDO MODAL (éxito)
        if (response.status === 200) {
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
    // Botón "Cerrar" del segundo modal
    cerrarSuccessModal() {
      // Quita la sesión y vete a /login
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