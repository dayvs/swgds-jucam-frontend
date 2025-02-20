<template>
  <div class="reportes-page" style="background-color: #F6F8F9;">
    <div class="container py-5">
      <h2 class="title">Reportes de Donaciones</h2>
      <div v-if="loading" class="text-center my-5">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Cargando...</span>
        </div>
      </div>
      <div v-else>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Donador</th>
              <th>Correo</th>
              <th>Monto</th>
              <th>Método de Pago</th>
              <th>Estado</th>
              <th>Transacción ID</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="donacion in donaciones" :key="donacion.donacion_id">
              <td>{{ formatDate(donacion.fechaDonacion) }}</td>
              <td>{{ donacion.donador ? donacion.donador.nombre : 'Anónimo' }}</td>
              <td>{{ donacion.donador ? donacion.donador.email : '-' }}</td>
              <td>{{ donacion.monto | currency }}</td>
              <td>{{ donacion.metodoPago }}</td>
              <td>{{ donacion.estado }}</td>
              <td>{{ donacion.transaccionId }}</td>
            </tr>
          </tbody>
        </table>
        <div class="total-donaciones mt-4">
          <h4>Total de Donaciones: {{ totalDonaciones | currency }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Reportes',
  data() {
    return {
      donaciones: [],
      totalDonaciones: 0,
      loading: true
    };
  },
  mounted() {
    this.fetchDonaciones();
  },
  methods: {
    fetchDonaciones() {
      axios
        .get('https://swgds-jucam-backend.onrender.com/reportes/donaciones')
        .then(response => {
          // Se asume que el endpoint retorna un arreglo de objetos con la información de cada donación
          this.donaciones = response.data;
          // Calcular el total sumando el campo "monto" de cada registro
          this.totalDonaciones = this.donaciones.reduce((total, donacion) => {
            return total + parseFloat(donacion.monto);
          }, 0);
        })
        .catch(error => {
          console.error('Error al obtener donaciones:', error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    formatDate(dateStr) {
      const options = { 
        year: 'numeric', month: 'short', day: 'numeric', 
        hour: '2-digit', minute: '2-digit'
      };
      return new Date(dateStr).toLocaleDateString('es-ES', options);
    }
  },
  filters: {
    currency(value) {
      if (typeof value !== "number") {
        value = parseFloat(value);
      }
      return new Intl.NumberFormat('es-MX', {
        style: 'currency', 
        currency: 'MXN',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2 
      }).format(value);
    }
  }
};
</script>

<style scoped>
.title {
  color: #193238;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  margin-bottom: 20px;
}
.table {
  background-color: #fff;
}
.total-donaciones {
  text-align: right;
  font-family: 'Inter', sans-serif;
  color: #193238;
}
</style>