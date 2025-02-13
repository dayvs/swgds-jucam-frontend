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
          <button type="button" class="btn btn-eliminar" @click="eliminarEmpleado">
            Eliminar
          </button>
        </div>
      </form>
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
            nombre: this.empleado.rol.nombre,  // ✅ Correctamente estructurado
          },
        };

        await axios.put(
          `https://swgds-jucam-backend.onrender.com/usuarios/${usuarioId}`,
          payload
        );
        alert('Cambios guardados exitosamente');
      } catch (error) {
        console.error('Error al guardar los cambios:', error);
        alert('No se pudieron guardar los cambios');
      }
    },
    regresar() {
      this.$router.push('/admin');
    },
    async eliminarEmpleado() {
      if (confirm('¿Estás seguro de que deseas eliminar este empleado?')) {
        try {
          const usuarioId = this.$route.params.usuarioId;
          await axios.delete(
            `https://swgds-jucam-backend.onrender.com/usuarios/${usuarioId}`
          );
          alert('Empleado eliminado exitosamente');
          this.$router.push('/admin');
        } catch (error) {
          console.error('Error al eliminar el empleado:', error);
          alert('No se pudo eliminar el empleado');
        }
      }
    },
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

.btn-regresar,
.btn-eliminar {
  background-color: #EBEDED;
  color: #193238;
  border: none;
}
</style>