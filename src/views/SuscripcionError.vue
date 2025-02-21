<template>
    <div class="suscripcion-error-container">
      <!-- Ícono de error -->
      <div class="icon-container">
        <i class="fas fa-credit-card"></i>        
      </div>
  
      <h1 class="title">¡Tu pago fue declinado!</h1>
      <p class="description">
        Lamentablemente tu pago fue declinado. Por favor contacta a tu banco e intenta nuevamente. <br />
        Tu contribución nos ayuda a continuar con nuestra misión de mejorar la vida de muchas personas.
      </p>
  
      <!-- Ícono de tarjeta o lo que prefieras 
      <div class="icono-tarjeta mt-3">
        <i class="fas fa-credit-card"></i>
      </div> -->
  
      <!-- Botón para reintentar -->
      <button @click="intentarNuevamente" class="btn-reintentar">
        Intenta nuevamente
      </button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SuscripcionError',
    methods: {
      intentarNuevamente() {
        // Redirige de vuelta a la página de servicios, según lo solicitado
        this.$router.push('/servicios');
      }
    }
  };
  </script>
  
  <style scoped>
  .suscripcion-error-container {
    max-width: 600px;
    margin: auto;
    padding: 40px;
    background: rgba(246, 248, 249, 1);
    border-radius: 8px;
    text-align: center;
    font-family: 'Inter', sans-serif;
  }
  
  /* Ícono principal */
  .icon-container {
    position: relative;
    display: inline-block;
    margin-bottom: 30px;
    font-size: 80px;
    color: #d9534f; /* Rojo o el color que prefieras */
  }
  
  .error-icon {
    font-size: 40px;
    color: #d9534f;
    position: absolute;
    top: 0;
    right: -10px;
  }
  
  /* Título */
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
  
  /* Ícono de tarjeta */
  .icono-tarjeta i {
    font-size: 40px;
    color: #193238;
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