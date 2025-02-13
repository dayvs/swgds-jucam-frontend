<template>
  <div class="admin-empleados" style="background-color: #F6F8F9;">
    <div class="container py-5">
      <h2 class="title">Administrar Empleados</h2>
      <ul class="empleados-list mt-4">
        <li v-for="empleado in empleados" :key="empleado.usuarioId" class="empleado-item">
          <div class="empleado-info">
            <i class="fas fa-user empleado-icon"></i>
            <div class="empleado-text">
              <span class="nombre">{{ empleado.nombre }} {{ empleado.apellidos }}</span>
              <span class="correo">{{ empleado.email }}</span>
            </div>
          </div>
          <div class="flecha-detalle" @click="verEmpleado(empleado.usuarioId)">
            <i class="fas fa-arrow-right"></i>
          </div>
        </li>
      </ul>
      <div class="buttons mt-4">
        <button class="btn btn-primary" @click="abrirModal">
          <i class="fas fa-plus"></i> Agregar nuevo empleado
        </button>
        <button class="btn btn-secondary" @click="logout">
          <i class="fas fa-sign-out-alt"></i> Cerrar sesión
        </button>
      </div>

      <!-- Modal para Agregar Empleado -->
      <div
        class="modal"
        tabindex="-1"
        :class="{ 'show d-block': showModal }"
        v-if="showModal"
        style="background-color: rgba(0, 0, 0, 0.5);"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Agregar empleado</h5>
              <button type="button" class="btn-close" @click="cerrarModal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="agregarEmpleado">
                <div class="mb-3">
                  <label for="nombre" class="form-label">Nombre(s)</label>
                  <input
                    type="text"
                    id="nombre"
                    v-model="nuevoEmpleado.nombre"
                    class="form-control"
                    placeholder="Ingrese el nombre"
                  />
                  <div v-if="errores.nombre" class="text-danger">{{ errores.nombre }}</div>
                </div>
                <div class="mb-3">
                  <label for="apellidos" class="form-label">Apellidos</label>
                  <input
                    type="text"
                    id="apellidos"
                    v-model="nuevoEmpleado.apellidos"
                    class="form-control"
                    placeholder="Ingrese los apellidos"
                  />
                  <div v-if="errores.apellidos" class="text-danger">{{ errores.apellidos }}</div>
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">Correo electrónico</label>
                  <input
                    type="email"
                    id="email"
                    v-model="nuevoEmpleado.email"
                    class="form-control"
                    placeholder="Ingrese el correo electrónico"
                  />
                  <div v-if="errores.email" class="text-danger">{{ errores.email }}</div>
                </div>
                <div class="mb-3">
                  <label for="rol" class="form-label">Rol</label>
                  <select id="rol" v-model="nuevoEmpleado.rol.nombre" class="form-control">
                    <option value="Empleado">Empleado</option>
                    <option value="Administrador">Administrador</option>
                  </select>                  
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" @click="cerrarModal">Cancelar</button>
                  <button type="submit" class="btn btn-primary">Guardar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal de Confirmación -->
      <div
        class="modal"
        tabindex="-1"
        :class="{ 'show d-block': showSuccessModal }"
        v-if="showSuccessModal"
        style="background-color: rgba(0, 0, 0, 0.5);"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content text-center">
            <div class="modal-header">
              <button type="button" class="btn-close" @click="cerrarSuccessModal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <h5 class="modal-title">El empleado se agregó con éxito</h5>
              <button type="button" class="btn btn-primary mt-3" @click="cerrarSuccessModal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AdministrarEmpleados',
  data() {
    return {
      empleados: [],
      showModal: false,
      nuevoEmpleado: {
        nombre: '',
        apellidos: '',
        email: '',
        rol: { nombre: 'Empleado' },
      },
      errores: {},
      showSuccessModal: false,
    };
  },
  methods: {
    async obtenerEmpleados() {
      try {
        const response = await axios.get('https://swgds-jucam-backend.onrender.com/usuarios');
        this.empleados = response.data;
      } catch (error) {
        console.error('Error al obtener empleados:', error);
      }
    },
    verEmpleado(usuarioId) {
      this.$router.push(`/admin/${usuarioId}`);
    },
    abrirModal() {
      this.showModal = true;
    },
    cerrarModal() {
      this.showModal = false;
      this.nuevoEmpleado = {
        nombre: '',
        apellidos: '',
        email: '',
        rol: { nombre: 'Empleado' },
      };
      this.errores = {};
    },
    cerrarSuccessModal() {
      this.showSuccessModal = false;
    },
    validarFormulario() {
      this.errores = {};

      const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!this.nuevoEmpleado.nombre) {
        this.errores.nombre = 'Este campo es obligatorio';
      } else if (!nombreRegex.test(this.nuevoEmpleado.nombre)) {
        this.errores.nombre = 'Por favor ingresa un nombre válido';
      }

      if (!this.nuevoEmpleado.apellidos) {
        this.errores.apellidos = 'Este campo es obligatorio';
      } else if (!nombreRegex.test(this.nuevoEmpleado.apellidos)) {
        this.errores.apellidos = 'Por favor ingresa un apellido válido';
      }

      if (!this.nuevoEmpleado.email) {
        this.errores.email = 'Este campo es obligatorio';
      } else if (!emailRegex.test(this.nuevoEmpleado.email)) {
        this.errores.email = 'Por favor ingresa un correo válido';
      }
    },
    async agregarEmpleado() {
      this.validarFormulario();

      if (Object.keys(this.errores).length === 0) {
        try {
          const response = await axios.post('https://swgds-jucam-backend.onrender.com/usuarios', this.nuevoEmpleado);
          if (response.status === 201) {
            this.showModal = false;
            this.showSuccessModal = true;
            this.obtenerEmpleados();
          }
        } catch (error) {
          if (error.response && error.response.data && error.response.data.mensaje) {
            this.errores.email = error.response.data.mensaje;
          } else {
            console.error('Error al agregar empleado:', error);
            alert('No se pudo agregar el empleado. Por favor intenta más tarde.');
          }
        }
      }
    },
    logout() {
      localStorage.removeItem('user');
      this.$router.push('/login');
    },
  },
  mounted() {
    this.obtenerEmpleados();
  },
};
</script>

<style scoped>
.title {
  color: #193238;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
}

.empleados-list {
  list-style: none;
  padding: 0;
}

.empleados-list li { 
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.empleados-list li i {
  font-size: 24px;
  color: #193238;
  margin-right: 15px;
}

.empleado-info {
  text-align: left;
  display: flex;
  align-items: center;
}

.empleado-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 10px;
  border-bottom: 1px solid #e0e0e0;
}

.empleado-icon {
  font-size: 32px; /* Ícono más grande */
  color: #193238;
  margin-right: 15px;
}

.empleado-text {
  display: flex;
  flex-direction: column;
}

.nombre {
  color: #193238;
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  font-weight: 600;
}

.correo {
  color: #7E8A8C;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 400;
}

.buttons {
  display: flex;
  justify-content: space-between;
}

.btn-primary {
  background-color: #17C6ED;
  color: #FFFFFF;
  border: none;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
}

.btn-secondary {
  background-color: #EBEDED;
  color: #193238;
  border: none;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
}

.modal-title {
  color: #193238;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
}

.form-label {
  color: #193238;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
}

.form-control {
  background-color: #EBEDED;
  border: none;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
}

.form-control::placeholder {
  color: #7E8A8C;
}

.text-danger {
  color: #EA3232;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
}

.modal-footer .btn {
  width: 173px;
}

.modal-footer .btn-primary {
  background-color: #17C6ED;
  color: #FFFFFF;
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
}

.modal-footer .btn-secondary {
  background-color: #EBEDED;
  color: #193238;
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
}

.modal-header .btn-close {
  background: none;
  border: none;
}

.flecha-detalle {
  font-size: 18px;
  color: #193238;
  cursor: pointer;
}

.flecha-detalle:hover {
  color: #17c6ed; 
}

</style>