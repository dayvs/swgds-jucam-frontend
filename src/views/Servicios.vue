<template>
  <div class="servicios-page container py-5">
    <h1 class="title">Nuestros servicios</h1>
    <p class="description">
      Ofrecemos distintos servicios para apoyar a nuestra comunidad. Puedes suscribirte a cualquiera de ellos para contribuir y beneficiarte de nuestras iniciativas. Únicamente da click en "Suscribirse", llena tu información, completa el pago, ¡y listo! Quedarás suscrito.
    </p>

    <div class="row mt-5">
      <!-- Recorremos el array de servicios -->
      <div 
        v-for="(servicio, index) in servicios" 
        :key="index" 
        class="col-12 col-md-6 col-lg-4 mb-4"
      >
        <div class="servicio-card p-4 h-100">
          <!-- Ícono -->
          <div class="icono-servicio mb-3">
            <i :class="servicio.icono"></i>
          </div>
          <!-- Título del servicio -->
          <h2 class="servicio-title">{{ servicio.titulo }}</h2>
          <!-- Subtítulo del servicio -->
          <h3 class="servicio-subtitle">{{ servicio.subtitulo }}</h3>
          <!-- Descripción -->
          <p class="servicio-description">{{ servicio.descripcion }}</p>
          <!-- Botón de suscribirse -->
          <button 
            class="btn btn-suscribirse mt-auto" 
            @click="suscribirse(servicio)"
          >
            Suscribirse
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Servicios',
  data() {
    return {
      servicios: [
        {
          icono: 'fas fa-user-graduate', 
          titulo: 'Taller de Liderazgo Juvenil',
          subtitulo: 'Conviértete en un líder que aborde temas relevantes para tu comunidad',
          descripcion: 'Taller enfocado en capacitar a jóvenes para convertirse en líderes en sus comunidades, impulsando proyectos sociales que aborden problemas como la pobreza y la desigualdad. Este taller puede ayudar a los jóvenes a desarrollar habilidades de liderazgo, trabajo en equipo y gestión de proyectos.'
        },
        {
          icono: 'fas fa-people-carry', 
          titulo: 'Taller de Desarrollo Comunitario',
          subtitulo: 'Ayuda a tu comunidad en proyectos que tengan impacto real',
          descripcion: 'Enseña a los participantes cómo identificar necesidades en sus comunidades y cómo intervenir eficazmente para mejorar la calidad de vida de los más vulnerables. Los asistentes aprenderán a crear diagnósticos comunitarios y a colaborar con diversas instituciones.'
        },
        {
          icono: 'fas fa-hands-helping', 
          titulo: 'Programa de Voluntariado',
          subtitulo: 'Participa en actividades de voluntariado y programas comunitarios de JUCAM',
          descripcion: 'Este programa ofrece oportunidades para participar en actividades de voluntariado y programas comunitarios organizados por JUCAM. Esto puede incluir desde trabajo en campo hasta la organización de eventos colectivos.'
        },
        {
          icono: 'fas fa-briefcase', 
          titulo: 'Consultoría y Servicios de Apoyo',
          subtitulo: 'Recibe asesoría especializada para impulsar tu desarrollo comunitario',
          descripcion: 'JUCAM cuenta con expertos en distintas áreas que ofrecen servicios de consultoría, asesoramiento o capacitación como parte de la suscripción, enfocándose en temas relacionados con el desarrollo comunitario.'
        }
      ],
    };
  },
  methods: {
    suscribirse(servicio) {
      // Aquí irá la lógica para suscribirse al servicio.
      // De momento, solo mostramos un alert o console.log.
      console.log(`Suscribirse a: ${servicio.titulo}`);
      alert(`Te suscribirás al servicio: ${servicio.titulo}. (Pendiente de lógica con la API)`);
    }
  }
};
</script>

<style scoped>
.servicios-page {
  background-color: #F6F8F9;
  border-radius: 8px;
  text-align: left;
  color: #193238;
  font-family: 'Inter', sans-serif;
  padding: 40px;
}

.title {
  text-align: center;
  color: #193238;
  font-weight: 700;
  font-size: 24px;
}

.description {
  text-align: center;
  color: #555;
  font-size: 16px;
  margin-top: 10px;
}

/* Tarjetas de servicio */
.servicio-card {
  background: rgba(246, 248, 249, 1);  
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.icono-servicio i {
  font-size: 2rem;
  color: #17C6ED;
}

/* Título del servicio */
.servicio-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #193238;
  margin-bottom: 5px;
}

/* Subtítulo del servicio */
.servicio-subtitle {
  font-size: 1rem;
  font-weight: 500;
  color: #7E8A8C;
  margin-bottom: 10px;
}

/* Descripción */
.servicio-description {
  font-size: 0.95rem;
  color: #193238;
  flex-grow: 1; /* Empuja el botón hacia abajo */
}

/* Botón Suscribirse */
.btn-suscribirse {
  background-color: #17C6ED;
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  border: none;
  border-radius: 4px;
  width: 100%;
  padding: 10px;
  cursor: pointer;
}

.btn-suscribirse:hover {
  background-color: #15b3d9;
}
</style>