<template>
  <div class="reportes-page" style="background-color: #F6F8F9;">
    <div class="container py-5">
      <!-- Encabezado con título -->
      <div class="text-center mb-4">
        <h2 class="title">Reportes de Donaciones</h2>        
      </div>

      <!-- botón de cerrar sesión 
      <div class="row d-flex justify-content-between align-items-end mb-4">       
        <button class="btn btn-secondary" @click="logout">Cerrar sesión</button>
      </div> -->

      <!-- Filtros -->
      <!-- Fila 1: Checkboxes a la izquierda (sin tocarlos) -->
      <div class="row g-3 align-items-center mb-3">
        <div class="col-md-3 d-flex flex-column align-items-start">
          <div class="form-check d-flex align-items-center mb-2">
            <input
              type="checkbox"
              class="form-check-input"
              id="donacionesCheck"
              v-model="filters.includeDonaciones"
            />
            <label class="form-check-label ms-1" for="donacionesCheck">
              Donaciones
            </label>

            <button class="btn btn-secondary align-items-end mb-4" @click="logout">Cerrar sesión</button>            
            
          </div>
          <div class="form-check d-flex align-items-center">
            <input
              type="checkbox"
              class="form-check-input"
              id="suscripcionesCheck"
              v-model="filters.includeSuscripciones"
            />
            <label class="form-check-label ms-1" for="suscripcionesCheck">
              Suscripciones
            </label>
          </div>
        </div>
      </div>

      <!-- Fila 2: Date picker/Selector de rango, centrados -->
      <div class="row g-3 align-items-center mb-3">
        <div class="col-md-3 d-flex flex-column align-items-start">
          <!-- Selector de rango -->
          <select
            class="form-select mb-2"
            style="min-width: 180px;"
            v-model="selectedRange"
            @change="onRangeChange"
          >
            <option value="day">Último día</option>
            <option value="week">Última semana</option>
            <option value="month">Último mes</option>
            <option value="year">Último año</option>
            <option value="custom">Rango de fechas</option>
          </select>

          <!-- Date picker (si se selecciona "custom") -->
          <div v-if="selectedRange === 'custom'" class="mt-2">
            <div class="input-group">
              <input
                type="datetime-local"
                class="form-control"
                v-model="customStartDate"
              />
              <span class="input-group-text">a</span>
              <input
                type="datetime-local"
                class="form-control"
                v-model="customEndDate"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Fila 3: Botones centrados debajo del date picker -->
      <div class="row g-3 align-items-center mb-3">
        <div class="col-auto text-center">
          <button class="btn btn-primary me-2" @click="fetchDashboard">
            Aplicar Filtros
          </button>
          <button class="btn btn-primary" @click="downloadCSV">
            Descargar reporte
          </button>
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
          <canvas id="donutChart" ref="donutChart"></canvas>
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
                <tr
                  v-for="item in dashboard.tablaSuscripciones"
                  :key="item.fecha + item.suscriptor"
                >
                  <td>{{ item.fecha }}</td>
                  <td>
                    <a href="#" @click.prevent="openSuscriptorModal(item)"
                      >{{ item.suscriptor }}</a
                    >
                  </td>
                  <td>{{ getServiceName(item.plan) }}</td>
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
            <canvas id="pieChart" ref="pieChart"></canvas>
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
        const day = now.getDay();
        const diff = now.getDate() - day + (day === 0 ? -6 : 1);
        start = new Date(now);
        start.setDate(diff);
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
        })
        .catch(error => {
          console.error('Error fetching dashboard data:', error);
        })
        .finally(() => {
          this.loading = false;
          this.$nextTick(() => {
            this.renderDonutChart();
            this.renderPieChart();
          });
        });
    },
    renderDonutChart() {
      let canvas = this.$refs.donutChart;
      if (Array.isArray(canvas)) {
        canvas = canvas[0];
      }
      if (!canvas) {
        console.error('Error: Canvas "donutChart" no se encontró en el DOM.');
        return;
      }
      const ctx = canvas.getContext('2d');
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
            backgroundColor: ['#17C6ED', '#1cc88a']
          }]
        },
        options: {
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.label || '';
                  const value = context.raw;
                  const dataItem = this.dashboard.donutChart[label.toLowerCase()];
                  const porcentaje = dataItem ? dataItem.porcentaje : 0;
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
      let canvas = this.$refs.pieChart;
      if (Array.isArray(canvas)) {
        canvas = canvas[0];
      }
      if (!canvas) {
        console.error('Error: Canvas "pieChart" no se encontró en el DOM.');
        return;
      }
      const ctx = canvas.getContext('2d');
      if (this.pieChartInstance) {
        this.pieChartInstance.destroy();
      }
      // Mapeo de service_id a nombre de servicio
      const serviceMapping = {
        "954d5763-81b2-4b8b-84e2-465c349a2f47": "Taller de Liderazgo Juvenil",
        "baf65f58-74b8-49c7-a577-44dc0dcbfc45": "Taller de Desarrollo Comunitario",
        "9bebc5fe-f2fd-4919-bcf4-174d88b19a59": "Programa de Voluntariado",
        "5e6e2f85-54af-4a86-9b0d-b4c560ca2778": "Consultoria y Servicios de Apoyo"
      };
      const palette = ['#17C6ED', '#1cc88a'];
      const labels = this.dashboard.pieChart.map(item => serviceMapping[item.plan] || item.plan);
      const dataValues = this.dashboard.pieChart.map(item => item.monto);
      const backgroundColors = labels.map((_, index) => palette[index % palette.length]);
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
                  const i = context.dataIndex;
                  const originalItem = this.dashboard.pieChart[i];
                  const serviceName = serviceMapping[originalItem.plan] || originalItem.plan;
                  const value = context.raw;
                  const porcentaje = originalItem.porcentaje || 0;
                  return `${serviceName}: ${this.formatCurrency(value)} (${porcentaje}%)`;
                }
              }
            }
          },
          responsive: true,
          maintainAspectRatio: false
        }
      });
    },
    getServiceName(id) {
      const serviceMapping = {
        "954d5763-81b2-4b8b-84e2-465c349a2f47": "Taller de Liderazgo Juvenil",
        "baf65f58-74b8-49c7-a577-44dc0dcbfc45": "Taller de Desarrollo Comunitario",
        "9bebc5fe-f2fd-4919-bcf4-174d88b19a59": "Programa de Voluntariado",
        "5e6e2f85-54af-4a86-9b0d-b4c560ca2778": "Consultoria y Servicios de Apoyo"
      };
      return serviceMapping[id] || id;
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
      axios
        .get(url, { responseType: 'text' })
        .then(response => {
          let csvData = response.data;
          csvData = this.normalizeText(csvData);
          csvData = this.replaceServiceIds(csvData);
          const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
          const link = document.createElement('a');
          const urlBlob = URL.createObjectURL(blob);
          link.setAttribute('href', urlBlob);
          const timestamp = new Date().toISOString().slice(0, 19).replace(/[-T:]/g, '');
          link.setAttribute('download', `Reporte_${timestamp}_Jucam.csv`);
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch(error => {
          console.error('Error downloading CSV:', error);
        });
    },
    normalizeText(text) {
      return text
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/ñ/g, 'n')
        .replace(/Ñ/g, 'N');
    },
    replaceServiceIds(text) {
      const serviceMapping = {
        '954d5763-81b2-4b8b-84e2-465c349a2f47': 'Taller de Liderazgo Juvenil',
        'baf65f58-74b8-49c7-a577-44dc0dcbfc45': 'Taller de Desarrollo Comunitario',
        '9bebc5fe-f2fd-4919-bcf4-174d88b19a59': 'Programa de Voluntariado',
        '5e6e2f85-54af-4a86-9b0d-b4c560ca2778': 'Consultoria y Servicios de Apoyo'
      };
      for (const id in serviceMapping) {
        const regex = new RegExp(id, 'g');
        text = text.replace(regex, serviceMapping[id]);
      }
      return text;
    },
    openDonadorModal(item) {
      this.modalDonador.data = {
        nombre: item.donador,
        correo: item.correo,
        telefono: item.telefono || ''
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
        telefono: item.telefono || ''
      };
      this.modalSuscriptor.visible = true;
    },
    closeSuscriptorModal() {
      this.modalSuscriptor.visible = false;
    },
    logout() {
      localStorage.removeItem('user');
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

/* Estilos de tablas y botones se adaptan a la paleta general */
.table {
  background-color: #fff;
}

.btn {
  font-family: 'Inter', sans-serif;
}

.btn-primary {
  background-color: #17C6ED;
  border: none;
}

.btn-secondary {
  background-color: #EBEDED;
  color: #193238;
  border: none;
}

/* Checkboxes color y margen */
.form-check-input:checked {
  background-color: #17C6ED;
  border-color: #17C6ED;
}

.form-check-label {
  margin-left: 0.25rem;
  line-height: 1;
}

/* Ajusta la altura del checkbox si deseas */
.form-check-input {
  width: 1.2rem;
  height: 1.2rem;
}

/* Modales para Donador y Suscriptor */
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
  width: 100%;
  max-width: 500px;
}
.btn-close {
  background: none;
  border: none;
  font-size: 1.5rem;
}
.modal-header,
.modal-body,
.modal-footer {
  border: none;
}
.modal-title {
  color: #193238;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
}
</style>