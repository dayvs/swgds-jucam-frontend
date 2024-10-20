<template>
  <div class="landing-page" style="background-color: #F6F8F9;">
    <div class="container text-center py-5">
      <h1 class="title centered-title">JUCAM DONACIONES</h1>
      <!-- Reemplaza el src de la imagen por la ruta correcta -->
      <img src="@/assets/images/logo.png" alt="Logo de JUCAM" class="logo my-4">
      <h2 class="subtitle">Juntos hacemos más</h2>
      <p class="description mt-4">
        En JUCAM sabemos que la primera condición para que su sueño se haga realidad es despertar y después ponerse en movimiento, esforzarse y trabajar en comunidad.

Estamos convencidos de que haciendo equipo acabaremos con los que son verdaderos enemigos de todos nosotros: la pobreza, la corrupción, la desigualdad y la exclusión. Sólo trabajando con otros y a favor de todos, lo podremos lograr.
      </p>
      <div class="button-group mt-5">
        <router-link to="/donar" class="btn btn-primary btn-custom mx-2">
          <i class="fas fa-heart mr-2"></i>Donar
        </router-link>
        <router-link to="/servicios" class="btn btn-primary btn-custom mx-2">
          <i class="fas fa-tools mr-2"></i>Servicios
        </router-link>
        <router-link to="/login" class="btn btn-secondary btn-custom mx-2">
          <i class="fas fa-user mr-2"></i>Empleados
        </router-link>
      </div>
      <div class="social-media mt-5">
        <p class="follow-us">Síguenos en Redes Sociales</p>
        <div class="icons d-flex justify-content-center mt-3">
          <a href="https://www.facebook.com/SomosJUCAM" class="icon-wrapper mx-2">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="https://www.youtube.com/@somosjucam" class="icon-wrapper mx-2">
            <i class="fab fa-youtube"></i>
          </a>
          <a href="https://www.instagram.com/somosjucam" class="icon-wrapper mx-2">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="https://twitter.com/somosjucam" class="icon-wrapper mx-2">
            <i class="fab fa-twitter"></i>
          </a>
        </div>
      </div>      
    </div>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
};
</script>

<style scoped>
.title {
  color: #193238;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  .centered-title {
    text-align: center;
    }
}

.logo {
  width: 30%; /* Ajusta el tamaño según sea necesario */
}

.subtitle {
  color: #193238;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
}

.description {
  color: #193238;
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

.btn-secondary {
  background-color: #EBEDED;
  color: #193238;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  border: none;
}

.btn i {
  margin-right: 8px;
}

.btn-custom {
  width: 400px; /* Ajusta el ancho deseado */
  height: 120px; /* Ajusta el alto deseado */
  font-size: 1.8rem; /* Ajusta el tamaño de fuente */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px; /* Mantiene la forma del botón */
  margin: 10px 0;
}

/* Ajusta el tamaño del ícono dentro del botón */
.btn-custom i {
  font-size: 1.2rem;
  margin-right: 8px; /* Espacio entre el ícono y el texto */
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

/* Margen vertical en dispositivos pequeños */
@media (max-width: 767px) {
  .button-group .btn-custom {
    margin: 10px 0; /* 10px arriba y abajo */
  }
}


.follow-us {
  color: #193238;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
}

.icon-wrapper {
  width: 24px;
  height: 24px;
  background-color: #EBEDED;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #193238;
  font-size: 24px;
  border-radius: 4px;
}

.footer-text {
  color: #193238;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
}

@media (max-width: 767px) {
  /* Estilos para smartphones */
  .logo {
    width: 60%;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  /* Estilos para tablets */
  .logo {
    width: 40%;
  }
}

@media (min-width: 992px) {
  /* Estilos para desktops */
  .logo {
    width: 30%;
  }
}
</style>