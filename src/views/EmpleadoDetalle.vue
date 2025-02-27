<template>
  <div class="empleado-detalle" style="background-color: #F6F8F9;">
    <div class="container py-5">
      <h2 class="title">Detalle del Empleado</h2>
      <form @submit.prevent="guardarCambios">
        <div class="mb-3">
          <label for="nombre" class="form-label">Nombre(s)</label>
          <input
            type="text"
            id="nombre"
            v-model="empleado.nombre"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="apellidos" class="form-label">Apellidos</label>
          <input
            type="text"
            id="apellidos"
            v-model="empleado.apellidos"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Correo electrónico</label>
          <input
            type="email"
            id="email"
            v-model="empleado.email"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="rol" class="form-label">Rol</label>
          <select id="rol" v-model="empleado.rol.nombre" class="form-control">
            <option value="Administrador">Administrador</option>
            <option value="Empleado">Empleado</option>
          </select>
        </div>
        <!-- Botones -->
        <div class="buttons mt-4">
          <button type="submit" class="btn btn-guardar">
            Guardar
          </button>
          <button type="button" class="btn btn-regresar" @click="regresar">
            Regresar
          </button>
          <!-- Botón nuevo: Reestablecer contraseña -->
          <button type="button" class="btn btn-reset" @click="confirmarReset">
            Reestablecer contraseña
          </button>
          <button type="button" class="btn btn-eliminar" @click="confirmarEliminar">
            Eliminar
          </button>
        </div>
      </form>
    </div>

    <!-- MODAL DE CONFIRMACIÓN PARA ELIMINAR EMPLEADO -->
    <div
      class="modal"
      tabindex="-1"
      :class="{ 'show d-block': showConfirmDeleteModal }"
      v-if="showConfirmDeleteModal"
      style="background-color: rgba(0, 0, 0, 0.5);"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content text-center">
          <div class="modal-header">
            <button type="button" class="btn-close" @click="cancelarEliminar" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <h5 class="modal-title">¿Estás seguro de eliminar este empleado?</h5>
            <p></p>
            <div class="row g-3 align-items-center mb-3">
              <div class="col-auto text-center">
                <button class="btn btn-secondary me-2" @click="cancelarEliminar">Cancelar</button>
                <button class="btn btn-primary" @click="eliminarEmpleado">Eliminar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL DE CONFIRMACIÓN PARA REESTABLECER CONTRASEÑA -->
    <div
      class="modal"
      tabindex="-1"
      :class="{ 'show d-block': showConfirmResetModal }"
      v-if="showConfirmResetModal"
      style="background-color: rgba(0, 0, 0, 0.5);"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content text-center">
          <div class="modal-header">
            <button type="button" class="btn-close" @click="cancelarReset" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <h5 class="modal-title">¿Reestablecer contraseña a "Password1"?</h5>
            <div class="mt-3">
              <button type="button" class="btn btn-secondary" @click="cancelarReset">Cancelar</button>
              <button type="button" class="btn btn-primary ms-2" @click="resetPassword">Confirmar</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL DE ÉXITO (MISMO ESTILO QUE EN AdministrarEmpleados.vue) -->
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
            <h5 class="modal-title">{{ successMessage }}</h5>
            <button type="button" class="btn btn-primary mt-3" @click="cerrarSuccessModal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'EmpleadoDetalle',
  data() {
    return {
      empleado: {
        nombre: '',
        apellidos: '',
        email: '',
        rol: {
          nombre: '',
        },
      },
      showConfirmDeleteModal: false,
      showConfirmResetModal: false,
      showSuccessModal: false,
      successMessage: ''
    };
  },
  methods: {
    async obtenerEmpleado() {
      try {
        const usuarioId = this.$route.params.usuarioId;
        const response = await axios.get(
          `https://swgds-jucam-backend.onrender.com/usuarios/${usuarioId}`
        );
        this.empleado = response.data;
        if (typeof this.empleado.rol === 'string') {
          this.empleado.rol = { nombre: this.empleado.rol };
        }
      } catch (error) {
        console.error('Error al obtener el empleado:', error);
      }
    },
    async guardarCambios() {
      try {
        const usuarioId = this.$route.params.usuarioId;
        const payload = {
          nombre: this.empleado.nombre,
          apellidos: this.empleado.apellidos,
          email: this.empleado.email,
          estado: this.empleado.estado,
          rol: {
            nombre: this.empleado.rol.nombre,
          },
        };

        await axios.put(
          `https://swgds-jucam-backend.onrender.com/usuarios/${usuarioId}`,
          payload
        );
        // Mensaje de éxito con el mismo estilo que agregar empleado
        this.successMessage = 'El empleado se actualizó con éxito';
        this.showSuccessModal = true;
      } catch (error) {
        console.error('Error al guardar los cambios:', error);
        alert('No se pudieron guardar los cambios');
      }
    },
    regresar() {
      this.$router.push('/admin');
    },
    confirmarEliminar() {
      this.showConfirmDeleteModal = true;
    },
    cancelarEliminar() {
      this.showConfirmDeleteModal = false;
    },
    async eliminarEmpleado() {
      try {
        const usuarioId = this.$route.params.usuarioId;
        await axios.delete(
          `https://swgds-jucam-backend.onrender.com/usuarios/${usuarioId}`
        );
        this.showConfirmDeleteModal = false;
        // Mensaje de éxito con el mismo estilo
        this.successMessage = 'Empleado eliminado exitosamente';
        this.showSuccessModal = true;
      } catch (error) {
        console.error('Error al eliminar el empleado:', error);
        alert('No se pudo eliminar el empleado');
      }
    },
    // Botón para confirmar reestablecimiento de contraseña
    confirmarReset() {
      this.showConfirmResetModal = true;
    },
    cancelarReset() {
      this.showConfirmResetModal = false;
    },
    async resetPassword() {
      try {
        const usuarioId = this.$route.params.usuarioId;
        await axios.post(
          `https://swgds-jucam-backend.onrender.com/usuarios/${usuarioId}/reset-password`
        );
        this.showConfirmResetModal = false;
        // Mensaje de éxito con el mismo estilo
        this.successMessage = 'La contraseña se reestableció con éxito';
        this.showSuccessModal = true;
      } catch (error) {
        console.error('Error al reestablecer la contraseña:', error);
        alert('No se pudo reestablecer la contraseña');
      }
    },
    cerrarSuccessModal() {
      this.showSuccessModal = false;
      // Si el empleado se eliminó, volver a la lista
      if (this.successMessage.includes('eliminado')) {
        this.$router.push('/admin');
      }
    }
  },
  mounted() {
    this.obtenerEmpleado();
  },
};
</script>

<style scoped>
.title {
  color: #193238;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
}

/* Estilos de los botones */
.buttons {
  display: flex;
  gap: 16px;
}

.btn {
  width: 173px;
  padding: 9px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  flex-shrink: 0;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
}

.btn-guardar {
  background-color: #17C6ED;
  color: #FFFFFF;
  border: none;
}

.btn-regresar {
  background-color: #EBEDED;
  color: #193238;
  border: none;
}

.btn-eliminar {
  background-color: #EBEDED;
  color: #193238;
  border: none;
}

.btn-reset {
  background-color: #EBEDED;
  color: #193238;
  border: none;
}

/* Modal con estilo similar a AdministrarEmpleados.vue */
.modal-title {
  color: #193238;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
}

.modal-header .btn-close {
  background: none;
  border: none;
}

.modal-content {
  border-radius: 8px;
}

.btn-secondary {
  background-color: #EBEDED;
  color: #193238;
  border: none;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  width: 100px;
}

.btn-primary {
  background-color: #17C6ED;
  color: #FFFFFF;
  border: none;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  width: 100px;
}

</style>