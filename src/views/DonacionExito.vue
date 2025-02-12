<template>
  <div class="donacion-exito-container">
    <h1 class="title">¡Gracias por tu donación!</h1>
    <p class="description">
      Tu contribución nos ayuda a continuar con nuestra misión de mejorar la vida de muchas personas. <br />
      Cada donación cuenta.
    </p>

    <h2 class="subtitle">Juntos hacemos más</h2>

    <!-- Ícono de agradecimiento -->
    <div class="icon-container">
      <i class="fas fa-hands-helping"></i>
    </div>

    <!-- Botón para regresar al inicio -->
    <button @click="irAlInicio" class="btn-inicio">
      Ir al inicio
    </button>
  </div>
</template>

<script>
export default {
  name: 'DonacionExito',
  methods: {
    irAlInicio() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
/* Contenedor principal */
.donacion-exito-container {
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

/* Descripción */
.description {
  color: #555;
  font-size: 16px;
  line-height: 1.5;
  margin-top: 10px;
}

/* Subtítulo */
.subtitle {
  color: #193238;
  font-weight: 600;
  font-size: 20px;
  margin-top: 20px;
}

/* Ícono de agradecimiento */
.icon-container {
  font-size: 80px;
  color: #17C6ED;
  margin-top: 30px;
}

/* Botón de inicio */
.btn-inicio {
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

.btn-inicio:hover {
  background-color: #15b3d9;
}
</style>