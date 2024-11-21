<template>
  <div class="login-page" style="background-color: #F6F8F9;">
    <div class="container py-5">
      <h2 class="main-title mt-4">Iniciar sesión</h2>
      <p class="cta-text">Ingresa tu usuario y contraseña para acceder al sistema.</p>
      <form @submit.prevent="login">
        <!-- Campo de Usuario -->
        <div class="mb-3 mt-4 row justify-content-center">
          <div class="col-md-6 col-lg-4">
            <label for="email" class="form-label">Usuario</label>
            <input
              type="email"
              id="email"
              v-model="email"
              class="form-control"
              placeholder="Ingresa tu correo"
              maxlength="256"
            />
          </div>
        </div>
        <!-- Campo de Contraseña -->
        <div class="mb-3 row justify-content-center">
          <div class="col-md-6 col-lg-4">
            <label for="password" class="form-label">Contraseña</label>
            <div class="input-group">
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="password"
                class="form-control"
                placeholder="Ingresa tu contraseña"
                maxlength="256"
              />
              <button
                class="btn btn-outline-secondary"
                type="button"
                @click="togglePasswordVisibility"
              >
                <i
                  :class="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
                  style="color: #7E8A8C;"
                ></i>
              </button>
            </div>
          </div>
        </div>
        <!-- Mensaje de Error -->
        <div v-if="errorMessage" class="error-message mt-2 text-center">
          {{ errorMessage }}
        </div>
        <!-- Botón de Envío con Animación de Loading -->
        <div class="text-center">
          <button
            type="submit"
            class="btn btn-primary mt-4"
            :disabled="loginInProgress"
          >
            <template v-if="loginInProgress">
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
                style="color: #FFFFFF;"
              ></span>
            </template>
            <template v-else>
              Iniciar sesión
            </template>
          </button>
        </div>
      </form>
      <!-- Olvidaste tu contraseña -->
      <p class="forgot-password mt-3" @click="openModal">¿Olvidaste tu contraseña?</p>

      <!-- Modal -->
      <div
        class="modal"
        tabindex="-1"
        :class="{ 'show d-block': showModal }"
        v-if="showModal"
        style="background-color: rgba(0, 0, 0, 0.5);"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title text-center">Reiniciar Contraseña</h5>
              <button
                type="button"
                class="btn-close"
                @click="closeModal"
                aria-label="Close"
              ></button>
            </div>
            <!-- Cuerpo del Modal -->
            <div class="modal-body text-center">
              <template v-if="!resetMessage">
                <label for="resetEmail" class="form-label">Ingresa tu correo</label>
                <input
                  type="email"
                  id="resetEmail"
                  v-model="resetEmail"
                  class="form-control"
                  placeholder="correo@ejemplo.com"
                />
              </template>
              <template v-else>
                <p>{{ resetMessage }}</p>
              </template>
            </div>
            <!-- Pie del Modal -->
            <div class="modal-footer justify-content-center">
              <template v-if="!resetMessage">
                <!-- Botón de Cerrar -->
                <button
                  v-if="!resetInProgress"
                  type="button"
                  class="btn btn-secondary-custom"
                  @click="closeModal"
                >
                  Cerrar
                </button>
                <!-- Botón de Reiniciar Contraseña -->
                <button
                  v-if="!resetInProgress"
                  type="button"
                  class="btn btn-primary"
                  @click="resetPassword"
                >
                  Reiniciar contraseña
                </button>
                <button v-else type="button" class="btn btn-primary" disabled>
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                </button>
              </template>
              <template v-else>
                <!-- Botón de Cerrar después de Reiniciar Contraseña -->
                <button type="button" class="btn btn-primary" @click="closeModal">
                  Cerrar
                </button>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      errorMessage: '',
      showModal: false,
      resetEmail: '',
      resetInProgress: false,
      resetMessage: '',
      loginInProgress: false, // estado para controlar la animación de loading
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    async login() {
      this.errorMessage = '';
      if (!this.email || !this.password) {
        this.errorMessage = 'El Usuario y la contraseña son obligatorios';
        return;
      }
      if (this.email.length < 4 || this.password.length < 4) {
        this.errorMessage = 'Mínimo 4 caracteres';
        return;
      }
      if (this.email.length > 256 || this.password.length > 256) {
        this.errorMessage = 'Máximo 256 caracteres';
        return;
      }
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(this.email)) {
        this.errorMessage = 'El correo debe tener un formato válido';
        return;
      }
      this.loginInProgress = true; // Activar animación de loading
      try {
        const response = await axios.post(
          'https://swgds-jucam-backend.onrender.com/auth/login',
          {
            email: this.email,
            password: this.password,
          }
        );
        if (response.status === 200) {
          // Almacenar indicador de sesión
          localStorage.setItem('user', JSON.stringify({ email: this.email }));
          // Redirigir a la sección de empleados
          this.$router.push('/empleados');
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.errorMessage = 'Usuario o contraseña incorrectos';
        } else {
          this.errorMessage = 'Ocurrió un error. Por favor, intenta nuevamente.';
        }
      } finally {
        this.loginInProgress = false; // Desactivar animación de loading
      }
    },
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.resetEmail = '';
      this.resetInProgress = false;
      this.resetMessage = '';
    },
    async resetPassword() {
      if (!this.resetEmail) {
        this.resetMessage = 'Por favor, ingresa tu correo electrónico.';
        return;
      }
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(this.resetEmail)) {
        this.resetMessage = 'El correo debe tener un formato válido';
        return;
      }
      this.resetInProgress = true;
      try {
        const response = await axios.post(
          'https://swgds-jucam-backend.onrender.com/auth/forgot-password',
          null,
          {
            params: {
              email: this.resetEmail,
            },
          }
        );
        if (response.status === 200) {
          this.resetMessage = 'Te enviamos un correo para reestablecer tu contraseña';
        }
      } catch (error) {
        this.resetMessage =
          'Ocurrió un error al enviar el correo. Por favor, intenta nuevamente.';
      } finally {
        this.resetInProgress = false;
      }
    },
  },
};
</script>

<style scoped>
/* Estilos existentes */
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

.cta-text {
  color: #193238;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
}

.form-label {
  color: #193238;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
}

.form-control::placeholder {
  color: #7E8A8C;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
}

.btn-primary {
  background-color: #17C6ED;
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  border: none;
}

.error-message {
  color: #EA3232;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
}

.forgot-password {
  color: #193238;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  cursor: pointer;
  text-decoration: underline;
}

.modal {
  background-color: rgba(0, 0, 0, 0.5);
}

.modal.show {
  display: block;
}

.modal-content {
  background-color: #FFFFFF;
}

.modal-header,
.modal-body,
.modal-footer {
  border: none;
}

.modal-title {
  color: #193238;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
}

.btn-close {
  background: none;
  border: none;
}

.spinner-border {
  color: #FFFFFF; /* Color del spinner */
}

.btn-secondary-custom {
  background-color: #EBEDED;
  color: #193238;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  border: none;
}
</style>
