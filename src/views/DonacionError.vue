<template>
  <div class="donacion-error-container">
    <h1 class="title">¡Tu pago fue declinado!</h1>
    <p class="description">
      Lamentablemente tu pago fue declinado. Por favor contacta a tu banco e intenta nuevamente. <br />
      Tu contribución nos ayuda a continuar con nuestra misión de mejorar la vida de muchas personas. <br />
      Cada donación cuenta.
    </p>

    <!-- Ícono de error de pago -->
    <div class="icon-container">
      <i class="fas fa-credit-card text-error"></i>
      <i class="fas fa-times-circle error-icon"></i>
    </div>

    <!-- Botón para reintentar la donación -->
    <button @click="irADonar" class="btn-reintentar">
      Intenta otra vez
    </button>
  </div>
</template>

<script>
export default {
  name: 'DonacionError',
  methods: {
    irADonar() {
      this.$router.push('/donar');
    }
  }
};
</script>

<style scoped>
/* Contenedor principal */
.donacion-error-container {
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
  color: #d9534f;
  font-weight: 700;
  font-size: 24px;
}

/* Descripción */
.description {
  color: #555;
  font-size: 16px;
  line-height: 1.5;
  margin-top: 10px;
}

/* Ícono de error de pago */
.icon-container {
  position: relative;
  display: inline-block;
  margin-top: 30px;
}

.text-error {
  font-size: 80px;
  color: #d9534f;
}

.error-icon {
  font-size: 40px;
  color: #d9534f;
  position: absolute;
  top: 0;
  right: -10px;
}

/* Botón para reintentar */
.btn-reintentar {
  background-color: #17C6ED;
  color: #fff;
  font-size: 18px;
  padding: 12px;
  width: 100%;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 30px;
}

.btn-reintentar:hover {
  background-color: #15b3d9;
}
</style>