<template>
  <div class="donar-container">
    <h1 class="title">Haz una Donación</h1>

    <div class="donation-info">
      <h2 class="subtitle">¿Por qué tu donación importa?</h2>
      <p class="description">
        Tu donación ayuda a financiar proyectos esenciales como la educación para niños desfavorecidos, la investigación médica y la protección del medio ambiente. 
        Cada contribución, grande o pequeña, tiene un impacto significativo en la vida de muchas personas y en la preservación de nuestro planeta.
        <br/>Gracias a tu generosidad, podemos continuar con nuestra misión de hacer del mundo un lugar mejor.
      </p>
      <p></p>

      <h2 class="subtitle">Cómo donar</h2>
      <ol class="donation-steps">
        <li>Ingresa tu nombre completo.</li>
        <li>Proporciona tu dirección de correo electrónico.</li>
        <li>Especifica el monto de la donación.</li>
        <li>Haz clic en el botón "Donar ahora".</li>
      </ol>
      <p></p>
      <p></p>
      <p></p>
      <p></p>
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
        />
      </div>

      <!-- Correo Electrónico -->
      <div class="form-group">
        <label for="email">Correo Electrónico</label>
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

      <!-- Monto de Donación -->
      <div class="form-group">
        <label for="monto">Monto de Donación</label>
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
      </div>

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
export default {
  name: 'Donar',
  data() {
    return {
      nombre: '',
      email: '',
      monto: '',
      errores: {
        email: '',
        monto: ''
      },
      loading: false
    };
  },
  methods: {
    validarEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.email.match(emailRegex)) {
        this.errores.email = 'Ingresa un correo electrónico válido';
      } else {
        this.errores.email = '';
      }
    },
    validarMonto() {
      const montoRegex = /^\d{1,6}(\.\d{1,2})?$/;
      if (!this.monto.match(montoRegex)) {
        this.errores.monto = 'Ingresa un monto correcto';
      } else {
        this.errores.monto = '';
      }
    },
    procesarDonacion() {
      this.validarEmail();
      this.validarMonto();

      if (!this.errores.email && !this.errores.monto) {
        this.loading = true;
        setTimeout(() => {
          alert('Donación procesada exitosamente.');
          this.loading = false;
          this.nombre = '';
          this.email = '';
          this.monto = '';
        }, 2000);
      }
    }
  }
};
</script>

<style scoped>
.donar-container {
  max-width: 600px;
  margin: auto;
  padding: 40px;
  background: rgba(246, 248, 249, 1);
  border-radius: 8px;  
  text-align: center;
  font-family: 'Inter', sans-serif;
}

.title {
  color: #193238;
  font-weight: 700;
  font-size: 24px;
  text-align: center;
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
  border: 1px solid #ccc;
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

.btn-donar {
  background-color: #17C6ED;
  color: #fff;
  font-size: 18px;
  padding: 12px;
  width: 100%;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  transition: 0.3s;
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