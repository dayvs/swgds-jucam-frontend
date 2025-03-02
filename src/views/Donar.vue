<template>
  <div class="donar-container">
    <h1 class="title">Haz una Donación</h1>

    <div class="donation-info">
      <h2 class="subtitle">¿Por qué tu donación importa?</h2>
      <p class="description">
        Tu donación ayuda a financiar proyectos esenciales como la educación para niños desfavorecidos, la investigación médica y la protección del medio ambiente. 
        Cada contribución, grande o pequeña, tiene un impacto significativo en la vida de muchas personas y en la preservación de nuestro planeta.
        <br />Gracias a tu generosidad, podemos continuar con nuestra misión de hacer del mundo un lugar mejor.
      </p>

      <h2 class="subtitle">Cómo donar</h2>
      <ol class="donation-steps">
        <li>Ingresa tu nombre completo.</li>
        <li>Proporciona tu dirección de correo electrónico.</li>
        <li>Especifica el monto de la donación.</li>
        <li>Haz clic en el botón "Donar ahora".</li>
      </ol>

      <!-- Espaciado adicional entre secciones -->
      <div class="extra-space"></div>

      <h2 class="subtitle">Dona ahora</h2>
    </div>

    <form @submit.prevent="procesarDonacion" class="donation-form">
      <!-- Nombre Completo -->
      <div class="form-group">
        <label for="nombre">Nombre completo</label>
        <input 
          type="text" 
          id="nombre" 
          v-model="nombre" 
          placeholder="Ingresa tu nombre completo"
          class="form-control"
          @blur="validarCampo('nombre')"
        />
        <div v-if="errores.nombre" class="error-message">{{ errores.nombre }}</div>
      </div>

      <!-- Correo Electrónico -->
      <div class="form-group">
        <label for="email">Correo electrónico</label>
        <input 
          type="email" 
          id="email" 
          v-model="email" 
          placeholder="Ingresa tu correo electrónico"
          class="form-control"
          @blur="validarEmail"
        />
        <div v-if="errores.email" class="error-message">{{ errores.email }}</div>
      </div>

      <!-- Teléfono -->
      <div class="form-group">
        <label for="telefono">Teléfono</label>
        <input 
          type="text" 
          id="telefono" 
          v-model="telefono" 
          placeholder="Ingresa tu número de teléfono"
          class="form-control"
          @blur="validarTelefono"
        />
        <div v-if="errores.telefono" class="error-message">{{ errores.telefono }}</div>
      </div>

      <!-- Monto de Donación -->
      <div class="form-group">
        <label for="monto">Monto de donación</label>
        <input 
          type="text" 
          id="monto" 
          v-model="monto" 
          placeholder="Ingresa el monto a donar"
          class="form-control"
          @blur="validarMonto"
        />
        <div v-if="errores.monto" class="error-message">{{ errores.monto }}</div>
        <p></p>
        <p></p>
        <p></p>
      </div>

      <div class="extra-space"></div>

      <!-- Botón Donar -->
      <button type="submit" class="btn-donar" :disabled="loading">
        <span v-if="loading" class="spinner-border spinner-border-sm"></span>
        <span v-else>Donar Ahora</span>
      </button>

      <p class="thank-you-message">
        Agradecemos de antemano tu generosidad y apoyo. <br />
        Tu donación hace la diferencia.
      </p>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Donar',
  data() {
    return {
      nombre: '',
      email: '',
      telefono: '',
      monto: '',
      errores: {
        nombre: '',
        email: '',
        telefono: '',
        monto: ''
      },
      loading: false
    };
  },
  methods: {
    validarCampo(campo) {
      if (!this[campo]) {
        this.errores[campo] = 'Este campo es obligatorio';
      } else {
        this.errores[campo] = '';
      }
    },
    validarEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.email) {
        this.errores.email = 'Este campo es obligatorio';
      } else if (!this.email.match(emailRegex)) {
        this.errores.email = 'Ingresa un correo electrónico válido';
      } else {
        this.errores.email = '';
      }
    },
    validarTelefono() {
      const telefonoRegex = /^\d{10}$/;
      if (!this.telefono) {
        this.errores.telefono = 'Este campo es obligatorio';
      } else if (!this.telefono.match(telefonoRegex)) {
        this.errores.telefono = 'Ingresa un teléfono válido';
      } else {
        this.errores.telefono = '';
      }
    },
    validarMonto() {
      const montoRegex = /^\d{1,6}(\.\d{1,2})?$/;
      if (!this.monto) {
        this.errores.monto = 'Este campo es obligatorio';
      } else if (!this.monto.match(montoRegex)) {
        this.errores.monto = 'Ingresa un monto correcto. Máximo 2 decimales.';
      } else {
        this.errores.monto = '';
      }
    },
    procesarDonacion() {
      this.validarCampo('nombre');
      this.validarEmail();
      this.validarTelefono();
      this.validarMonto();

       if (!this.errores.nombre && !this.errores.email && !this.errores.telefono && !this.errores.monto) {
        this.loading = true;
        axios
          .post('https://swgds-jucam-backend.onrender.com/pago', {
            name: this.nombre,
            email: this.email,
            phone: this.telefono,
            amount: parseFloat(this.monto)
          })
          .then(response => {
            const paymentUrl = response.data.paymentUrl;
            if (paymentUrl) {
              window.location.href = paymentUrl;
            } else {
              alert('No se pudo obtener la URL de pago. Inténtalo de nuevo.');
            }
          })
          .catch(error => {
            console.error('Error al procesar la donación:', error);
            alert('Ocurrió un error al procesar tu donación. Por favor, intenta nuevamente.');
          })
          .finally(() => {
            this.loading = false;
          });
      }
    }
  }
};
</script>

<style scoped>
/* Contenedor principal */
.donar-container {
  max-width: 600px;
  margin: auto;
  padding: 40px;
  background: rgba(246, 248, 249, 1);
  border-radius: 8px;
  text-align: center;
  font-family: 'Inter', sans-serif;
}

/* Títulos */
.title {
  color: #193238;
  font-weight: 700;
  font-size: 24px;
}

/* Sección de información alineada a la izquierda */
.donation-info {
  text-align: left;
}

/* Subtítulos */
.subtitle {
  color: #193238;
  font-weight: 600;
  font-size: 20px;
  margin-top: 20px;
}

/* Descripción */
.description {
  color: #555;
  font-size: 16px;
  line-height: 1.5;
}

/* Lista de instrucciones */
.donation-steps {
  text-align: left;
  padding-left: 20px;
  color: #193238;
  font-size: 16px;
  font-weight: 500;
}

/* Espaciado adicional entre secciones */
.extra-space {
  margin-bottom: 30px;
}

/* Estilos del formulario */
.form-group {
  text-align: left;
  margin-top: 15px;
}

label {
  font-weight: 500;
  color: #193238;
  display: block;
  margin-bottom: 5px;
}

/* Estilos del input */
.form-control {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  background-color: #EBEDED;
  border: none;
  border-radius: 5px;
  color: #193238;
}

.form-control::placeholder {
  color: #7E8A8C;
}

/* Mensaje de error */
.error-message {
  color: #EA3232;
  font-size: 14px;
  margin-top: 5px;
}

/* Botón Donar */
.btn-donar {
  background-color: #17C6ED;
  color: #fff;
  font-size: 18px;
  padding: 12px;
  width: 100%;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-donar:hover {
  background-color: #15b3d9;
}

.thank-you-message {
  margin-top: 15px;
  color: #555;
  font-size: 14px;
}

.spinner-border {
  color: #fff;
}

</style>