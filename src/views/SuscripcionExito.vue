<template>
    <div class="suscripcion-exito-container">
      <!-- Ícono de manos (mismo que en DonacionExito) -->
      <div class="icon-container">
        <i class="fas fa-hands-helping"></i>
      </div>
  
      <h1 class="title">¡Gracias por tu suscripción!</h1>
      <p class="description">
        Estamos seguros que obtendrás grandes beneficios de tu suscripción. 
        Tu contribución nos ayuda a continuar con nuestra misión de mejorar la vida de muchas personas.
      </p>
  
      <h2 class="subtitle"><strong>Juntos hacemos más</strong></h2>
  
      <!-- Botón para regresar al inicio -->
      <button @click="irAlInicio" class="btn-inicio">
        Ir al inicio
      </button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SuscripcionExito',
    methods: {
      irAlInicio() {
        this.$router.push('/');
      }
    }
  };
  </script>
  
  <style scoped>
  .suscripcion-exito-container {
    max-width: 600px;
    margin: auto;
    padding: 40px;
    background: rgba(246, 248, 249, 1);
    border-radius: 8px;
    text-align: center;
    font-family: 'Inter', sans-serif;
  }
  
  /* Ícono */
  .icon-container {
    font-size: 80px;
    color: #17C6ED;
    margin-bottom: 30px;
  }
  
  /* Título */
  .title {
    color: #193238;
    font-weight: 700;
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  /* Descripción */
  .description {
    color: #555;
    font-size: 16px;
    line-height: 1.5;
  }
  
  /* Subtítulo */
  .subtitle {
    color: #193238;
    font-weight: 600;
    font-size: 20px;
    margin-top: 20px;
  }
  
  /* Botón */
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