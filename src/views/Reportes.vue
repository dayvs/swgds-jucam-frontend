<template>
  <div class="reportes-page" style="background-color: #F6F8F9;">
    <div class="container py-5">
      <!-- Encabezado con título y botón de cerrar sesión -->
      <div class="header d-flex justify-content-between align-items-center mb-4">
        <h2 class="title">Reportes de Donaciones</h2>
        <button class="btn btn-secondary" @click="logout">Cerrar sesión</button>
      </div>

      <!-- Filtros -->
      <div class="filters mb-4">
        <div class="row">
          <div class="col-md-3">
            <div class="form-check">
              <input type="checkbox" class="form-check-input" id="donacionesCheck" v-model="filters.includeDonaciones">
              <label class="form-check-label" for="donacionesCheck">Donaciones</label>
            </div>
            <div class="form-check mt-2">
              <input type="checkbox" class="form-check-input" id="suscripcionesCheck" v-model="filters.includeSuscripciones">
              <label class="form-check-label" for="suscripcionesCheck">Suscripciones</label>
            </div>
          </div>
          <div class="col-md-4">
            <select class="form-select" v-model="selectedRange" @change="onRangeChange">
              <option value="day">Último día</option>
              <option value="week">Última semana</option>
              <option value="month">Último mes</option>
              <option value="year">Último año</option>
              <option value="custom">Rango de fechas</option>
            </select>
          </div>
          <div class="col-md-5" v-if="selectedRange === 'custom'">
            <div class="input-group">
              <input type="datetime-local" class="form-control" v-model="customStartDate">
              <span class="input-group-text">a</span>
              <input type="datetime-local" class="form-control" v-model="customEndDate">
            </div>
          </div>
        </div>
        <div class="mt-3">
          <button class="btn btn-primary" @click="fetchDashboard">Aplicar Filtros</button>
          <button class="btn btn-success ms-2" @click="downloadCSV">Descargar reporte</button>
        </div>
      </div>

      <!-- Loader -->
      <div v-if="loading" class="text-center my-5">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Cargando...</span>
        </div>
      </div>

      <!-- Contenido del Dashboard -->
      <div v-else>
        <!-- Total recaudado -->
        <div class="text-center mb-4">
          <h3>TOTAL RECAUDADO</h3>
          <h2>{{ formatCurrency(dashboard.totalRecaudado) }}</h2>
        </div>
        <!-- Donut Chart principal -->
        <div class="chart-container mb-5">
          <canvas id="donutChart"></canvas>
        </div>
        <!-- Tablas de Donaciones y Suscripciones -->
        <div class="row">
          <div class="col-md-6">
            <h4>Donaciones</h4>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Donador</th>
                  <th>Monto</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in dashboard.tablaDonaciones" :key="item.fecha">
                  <td>{{ item.fecha }}</td>
                  <td>
                    <a href="#" @click.prevent="openDonadorModal(item)">{{ item.donador }}</a>
                  </td>
                  <td>{{ formatCurrency(item.monto) }}</td>
                </tr>
                <tr>
                  <td colspan="2" class="text-end"><strong>Total:</strong></td>
                  <td><strong>{{ formatCurrency(totalDonacionesTable) }}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col-md-6">
            <h4>Suscripciones</h4>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Suscriptor</th>
                  <th>Plan</th>
                  <th>Monto</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in dashboard.tablaSuscripciones" :key="item.fecha + item.suscriptor">
                  <td>{{ item.fecha }}</td>
                  <td>
                    <a href="#" @click.prevent="openSuscriptorModal(item)">{{ item.suscriptor }}</a>
                  </td>
                  <td>{{ item.plan }}</td>
                  <td>{{ formatCurrency(item.monto) }}</td>
                </tr>
                <tr>
                  <td colspan="3" class="text-end"><strong>Total:</strong></td>
                  <td><strong>{{ formatCurrency(totalSuscripcionesTable) }}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- Pie Chart de Suscripciones -->
        <div class="text-center mt-5">
          <h4>Suscripciones</h4>
          <div class="chart-container" style="max-width: 500px; margin: 0 auto;">
            <canvas id="pieChart"></canvas>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Donador -->
    <div class="modal" tabindex="-1" role="dialog" v-if="modalDonador.visible">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Donador</h5>
            <button type="button" class="btn-close" @click="closeDonadorModal"></button>
          </div>
          <div class="modal-body">
            <p><strong>Nombre:</strong> {{ modalDonador.data.nombre }}</p>
            <p><strong>Correo:</strong> {{ modalDonador.data.correo }}</p>
            <p><strong>Teléfono:</strong> {{ modalDonador.data.telefono }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeDonadorModal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Suscriptor -->
    <div class="modal" tabindex="-1" role="dialog" v-if="modalSuscriptor.visible">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Suscriptor</h5>
            <button type="button" class="btn-close" @click="closeSuscriptorModal"></button>
          </div>
          <div class="modal-body">
            <p><strong>Nombre:</strong> {{ modalSuscriptor.data.nombre }}</p>
            <p><strong>Correo:</strong> {{ modalSuscriptor.data.correo }}</p>
            <p><strong>Teléfono:</strong> {{ modalSuscriptor.data.telefono }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeSuscriptorModal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import Chart from 'chart.js/auto';

export default {
  name: 'Reportes',
  data() {
    return {
      dashboard: {
        totalRecaudado: 0,
        donutChart: {},
        tablaDonaciones: [],
        tablaSuscripciones: [],
        pieChart: []
      },
      filters: {
        includeDonaciones: true,
        includeSuscripciones: true,
        startDate: null,
        endDate: null
      },
      selectedRange: 'month',
      customStartDate: '',
      customEndDate: '',
      loading: false,
      donutChartInstance: null,
      pieChartInstance: null,
      modalDonador: {
        visible: false,
        data: {}
      },
      modalSuscriptor: {
        visible: false,
        data: {}
      }
    };
  },
  computed: {
    totalDonacionesTable() {
      return this.dashboard.tablaDonaciones.reduce((sum, item) => {
        return sum + parseFloat(item.monto);
      }, 0);
    },
    totalSuscripcionesTable() {
      return this.dashboard.tablaSuscripciones.reduce((sum, item) => {
        return sum + parseFloat(item.monto);
      }, 0);
    }
  },
  mounted() {
    this.setDefaultDates();
    this.fetchDashboard();
  },
  methods: {
    setDefaultDates() {
      // Por defecto se usa el mes actual: desde el primer día hasta el momento actual
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0);
      this.filters.startDate = start.toISOString().slice(0, 19);
      this.filters.endDate = now.toISOString().slice(0, 19);
    },
    onRangeChange() {
      const now = new Date();
      let start, end;
      if (this.selectedRange === 'day') {
        start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
        end = now;
      } else if (this.selectedRange === 'week') {
        // Se asume que la semana inicia el lunes
        const day = now.getDay();
        const diff = now.getDate() - day + (day === 0 ? -6 : 1);
        start = new Date(now.setDate(diff));
        start.setHours(0, 0, 0, 0);
        end = new Date();
      } else if (this.selectedRange === 'month') {
        start = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0);
        end = new Date();
      } else if (this.selectedRange === 'year') {
        start = new Date(now.getFullYear(), 0, 1, 0, 0, 0);
        end = new Date();
      } else if (this.selectedRange === 'custom') {
        if (this.customStartDate && this.customEndDate) {
          this.filters.startDate = this.customStartDate;
          this.filters.endDate = this.customEndDate;
          return;
        }
      }
      this.filters.startDate = start.toISOString().slice(0, 19);
      this.filters.endDate = end.toISOString().slice(0, 19);
    },
    fetchDashboard() {
      this.loading = true;
      const url = `https://swgds-jucam-backend.onrender.com/reportes/dashboard?startDate=${this.filters.startDate}&endDate=${this.filters.endDate}&includeDonaciones=${this.filters.includeDonaciones}&includeSuscripciones=${this.filters.includeSuscripciones}`;
      axios.get(url)
        .then(response => {
          this.dashboard = response.data;
          this.renderDonutChart();
          this.renderPieChart();
        })
        .catch(error => {
          console.error('Error fetching dashboard data:', error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    renderDonutChart() {
      const ctx = document.getElementById('donutChart').getContext('2d');
      if (this.donutChartInstance) {
        this.donutChartInstance.destroy();
      }
      this.donutChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Donaciones', 'Suscripciones'],
          datasets: [{
            data: [
              this.dashboard.donutChart.donaciones ? this.dashboard.donutChart.donaciones.monto : 0,
              this.dashboard.donutChart.suscripciones ? this.dashboard.donutChart.suscripciones.monto : 0
            ],
            backgroundColor: ['#4e73df', '#1cc88a']
          }]
        },
        options: {
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.label || '';
                  const value = context.raw;
                  const porcentaje = this.dashboard.donutChart[label.toLowerCase()] 
                    ? this.dashboard.donutChart[label.toLowerCase()].porcentaje 
                    : 0;
                  return `${label}: ${this.formatCurrency(value)} (${porcentaje}%)`;
                }
              }
            }
          },
          responsive: true,
          maintainAspectRatio: false
        }
      });
    },
    renderPieChart() {
      const ctx = document.getElementById('pieChart').getContext('2d');
      if (this.pieChartInstance) {
        this.pieChartInstance.destroy();
      }
      const labels = this.dashboard.pieChart.map(item => item.plan);
      const dataValues = this.dashboard.pieChart.map(item => item.monto);
      const backgroundColors = labels.map(() => this.getRandomColor());
      this.pieChartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            data: dataValues,
            backgroundColor: backgroundColors
          }]
        },
        options: {
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.label || '';
                  const value = context.raw;
                  const item = this.dashboard.pieChart.find(i => i.plan === label);
                  const porcentaje = item ? item.porcentaje : 0;
                  return `${label}: ${this.formatCurrency(value)} (${porcentaje}%)`;
                }
              }
            }
          },
          responsive: true,
          maintainAspectRatio: false
        }
      });
    },
    getRandomColor() {
      return '#' + Math.floor(Math.random() * 16777215).toString(16);
    },
    formatDate(dateStr) {
      const options = { 
        year: 'numeric', month: 'short', day: 'numeric', 
        hour: '2-digit', minute: '2-digit'
      };
      return new Date(dateStr).toLocaleDateString('es-ES', options);
    },
    formatCurrency(value) {
      if (typeof value !== "number") {
        value = parseFloat(value);
      }
      return new Intl.NumberFormat('es-MX', {
        style: 'currency', 
        currency: 'MXN',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2 
      }).format(value);
    },
    downloadCSV() {
      const url = `https://swgds-jucam-backend.onrender.com/reportes/csv?startDate=${this.filters.startDate}&endDate=${this.filters.endDate}&includeDonaciones=${this.filters.includeDonaciones}&includeSuscripciones=${this.filters.includeSuscripciones}`;
      window.open(url, '_blank');
    },
    openDonadorModal(item) {
      this.modalDonador.data = {
        nombre: item.donador,
        correo: item.correo,
        telefono: '' // Puedes ampliar si cuentas con más datos
      };
      this.modalDonador.visible = true;
    },
    closeDonadorModal() {
      this.modalDonador.visible = false;
    },
    openSuscriptorModal(item) {
      this.modalSuscriptor.data = {
        nombre: item.suscriptor,
        correo: item.correo,
        telefono: '' // Puedes ampliar si cuentas con más datos
      };
      this.modalSuscriptor.visible = true;
    },
    closeSuscriptorModal() {
      this.modalSuscriptor.visible = false;
    },
    logout() {
      // Aquí puedes implementar la lógica para cerrar sesión y redireccionar
      window.location.href = '/login';
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
.chart-container {
  position: relative;
  height: 300px;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-dialog {
  background: #fff;
  border-radius: 5px;
  padding: 20px;
}
.btn-close {
  background: none;
  border: none;
  font-size: 1.5rem;
}
</style>