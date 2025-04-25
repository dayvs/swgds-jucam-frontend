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

        <!-- contenedor para el recaptcha -->
        <div ref="recaptchaContainer" id="recaptcha-container" class="my-3"></div>

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

      <!-- Modal de reinicio de contraseña -->
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
            <div class="modal-body text-center">
              <label for="resetEmail" class="form-label">Ingresa tu correo</label>
              <input
                type="email"
                id="resetEmail"
                v-model="resetEmail"
                class="form-control"
                placeholder="correo@ejemplo.com"
              />
              <div v-if="resetMessage" class="text-danger mt-2">{{ resetMessage }}</div>
            </div>
            <div class="modal-footer justify-content-center">
              <button
                v-if="!resetInProgress"
                type="button"
                class="btn btn-secondary-custom"
                @click="closeModal"
              >
                Cerrar
              </button>
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
            </div>
          </div>
        </div>
      </div>

      <!-- Modal de confirmación de reinicio de contraseña -->
      <div
        class="modal"
        tabindex="-1"
        :class="{ 'show d-block': showResetConfirmModal }"
        v-if="showResetConfirmModal"
        style="background-color: rgba(0, 0, 0, 0.5);"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content text-center">
            <div class="modal-header">
              <button
                type="button"
                class="btn-close"
                @click="closeResetConfirmModal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <h5 class="modal-title">
                Se envió un correo con las instrucciones para reestablecer tu contraseña
              </h5>
            </div>
            <div class="d-flex justify-content-center mb-3">
              <button
                type="button"
                class="btn"
                style="background-color: #17C6ED; color: #FFFFFF;"
                @click="closeResetConfirmModal"
              >
                Aceptar
              </button>
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
      showResetConfirmModal: false,
      loginInProgress: false, // estado para controlar la animación de loading
      widgetId: null,   // <— aquí se guarda el ID del widget
    };
  },
  mounted() {
    const initRecaptcha = () => {
      if (window.grecaptcha && window.grecaptcha.render) {
        this.widgetId = window.grecaptcha.render(
          this.$refs.recaptchaContainer,
          { sitekey: '6Lc8pCQrAAAAACBxYueNqOIPX5BldeWV4AiCQKPs' }
        );
      } else {
        setTimeout(initRecaptcha, 200);
      }
    };
    initRecaptcha();
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    async login() {
      this.errorMessage = '';

      // Se obtiene el token para este widget en particular
      const token = window.grecaptcha.getResponse(this.widgetId);
      if (!token) {
        this.errorMessage = 'Por favor completa el CAPTCHA';
        return;
      }
      if (!this.email || !this.password) {
        this.errorMessage = 'El usuario y la contraseña son obligatorios';
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
      this.loginInProgress = true;
      try {
        const response = await axios.post(
          'https://swgds-jucam-backend.onrender.com/auth/login',
          {
            email: this.email,
            password: this.password,
            recaptchaToken: token
          }
        );
        if (response.status === 200) {
          localStorage.setItem('user', JSON.stringify(response.data));
          this.$router.push('/empleados');
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.errorMessage = 'Usuario o contraseña incorrectos';
        } else {
          this.errorMessage = 'Ocurrió un error. Por favor, intenta nuevamente.';
        }
      } finally {
        this.loginInProgress = false;
        window.grecaptcha.reset(this.widgetId);
      }
    },
    openModal() {
      this.showModal = true;
      this.resetEmail = '';
      this.resetMessage = '';
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
          'https://swgds-jucam-backend.onrender.com/auth/reiniciar-password',
          null,
          { params: { email: this.resetEmail } }
        );
        if (response.status === 200) {
          this.resetMessage = '';
          this.showModal = false;
          this.showResetConfirmModal = true;
        }
      } catch (error) {
        if (error.response && error.response.data) {
          this.resetMessage = error.response.data;
        } else {
          this.resetMessage = 'No se pudo reestablecer tu contraseña. Intenta de nuevo más tarde.';
        }
      } finally {
        this.resetInProgress = false;
      }
    },
    closeResetConfirmModal() {
      this.showResetConfirmModal = false;
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
  color: #FFFFFF;
}
.btn-secondary-custom {
  background-color: #EBEDED;
  color: #193238;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  border: none;
}
</style>