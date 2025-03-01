<template>
  <div class="contrasena-page">
    <div class="container py-5">
      <h2 class="title">Reestablecer contraseña</h2>
      <div class="form-container">
        <form @submit.prevent="guardar">
          <!-- Campo de usuario -->
          <div class="mb-3">
            <label for="usuario" class="form-label">Usuario (correo):</label>
            <input
              type="email"
              id="usuario"
              v-model="usuario"
              class="form-control"
              placeholder="Ingresa tu correo"
              required
            />
            <div v-if="errorUsuario" class="text-danger mt-1">{{ errorUsuario }}</div>
          </div>
          <!-- Campo: contraseña actual (por defecto Password1) -->
          <div class="mb-3">
            <label for="oldPassword" class="form-label">Contraseña actual (default: Password1):</label>
            <input
              type="password"
              id="oldPassword"
              v-model="oldPassword"
              class="form-control"
              placeholder="Ingresa tu contraseña actual"
              required
            />
          </div>
          <!-- Campo: nueva contraseña -->
          <div class="mb-3">
            <label for="newPassword" class="form-label">Nueva contraseña:</label>
            <input
              type="password"
              id="newPassword"
              v-model="newPassword"
              class="form-control"
              required
            />
            <div v-if="errorNewSame" class="text-danger mt-1">{{ errorNewSame }}</div>
          </div>
          <!-- Campo: confirmar nueva contraseña -->
          <div class="mb-3">
            <label for="confirmPassword" class="form-label">Confirma tu nueva contraseña:</label>
            <input
              type="password"
              id="confirmPassword"
              v-model="confirmPassword"
              class="form-control"
              required
            />
            <div v-if="errorNotMatch" class="text-danger mt-1">{{ errorNotMatch }}</div>
          </div>
          <!-- Botones: Cancelar y Guardar -->
          <div class="modal-footer">
            <div class="d-flex justify-content-center">
              <button
                type="button"
                class="btn btn-secondary"
                @click="cancelar"
              >
                Cancelar
              </button>
              <button
                type="submit"
                class="btn btn-primary"
                :disabled="loading"
              >
                <span v-if="loading" class="spinner-border spinner-border-sm"></span>
                <span v-else>Guardar</span>
              </button>
            </div>
          </div>
          <div v-if="serverError" class="text-danger text-center mt-2">
            {{ serverError }}
          </div>
        </form>
      </div>
    </div>

    <!-- Modal de confirmación de cambio de contraseña -->
    <div
      class="modal"
      tabindex="-1"
      :class="{ 'show d-block': showConfirmModal }"
      v-if="showConfirmModal"
      style="background-color: rgba(0, 0, 0, 0.5);"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content text-center">
          <div class="modal-header">
            <button type="button" class="btn-close" @click="closeConfirmModal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <h5 class="modal-title">
              Contraseña actualizada correctamente. Inicia sesión con tu nueva contraseña.
            </h5>
          </div>
          <div class="d-flex justify-content-center mb-3">
            <button
              type="button"
              class="btn"
              style="background-color: #17C6ED; color: #FFFFFF;"
              @click="closeConfirmModal"
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Contrasena',
  data() {
    return {
      usuario: '',
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      errorUsuario: '',
      errorNewSame: '',
      errorNotMatch: '',
      serverError: '',
      loading: false,
      showConfirmModal: false
    };
  },
  methods: {
    cancelar() {
      // Redirigir al login sin hacer cambios
      this.$router.push('/login');
    },
    async guardar() {
      // Validar que el campo usuario no esté vacío
      if (!this.usuario) {
        this.errorUsuario = "Debes ingresar un usuario";
        return;
      } else {
        this.errorUsuario = "";
      }
      // Validar que la nueva contraseña sea diferente de la contraseña actual
      if (this.oldPassword === this.newPassword) {
        this.errorNewSame = "La nueva contraseña no puede ser la misma que la contraseña anterior";
        return;
      } else {
        this.errorNewSame = "";
      }
      // Validar que la nueva contraseña y su confirmación coincidan
      if (this.newPassword !== this.confirmPassword) {
        this.errorNotMatch = "La contraseña no coincide";
        return;
      } else {
        this.errorNotMatch = "";
      }
      
      this.loading = true;
      try {
        const response = await axios.put('https://swgds-jucam-backend.onrender.com/usuarios/cambiar-password', {
          email: this.usuario,
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
          confirmPassword: this.confirmPassword
        });
        if (response.status === 200) {
          // Mostrar el modal de confirmación
          this.showConfirmModal = true;
        }
      } catch (error) {
        if (error.response && error.response.data) {
          this.serverError = error.response.data;
        } else {
          this.serverError = "No se pudo guardar tu nueva contraseña, intenta de nuevo más tarde";
        }
      } finally {
        this.loading = false;
      }
    },
    closeConfirmModal() {
      this.showConfirmModal = false;
      // Al cerrar, redirigir al login para que el usuario inicie sesión con la nueva contraseña
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.contrasena-page {
  min-height: 100vh;
}
.title {
  color: #193238;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: center;
}
.form-container {
  max-width: 400px;
  margin: 0 auto;
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
.modal-dialog {
  margin-top: 10%;
}
.modal-title {
  color: #193238;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
}
</style>