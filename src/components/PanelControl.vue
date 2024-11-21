<template>
  <div class="panel-control">
    <h2 class="title">Panel de Control</h2>
    <ul class="menu">
      <li @click="navigateTo('admin')">
        <i class="fas fa-users"></i> Administrar empleados
      </li>
      <li @click="navigateTo('reportes')">
        <i class="fas fa-chart-line"></i> Reportes
      </li>
      <li @click="logout">
        <i class="fas fa-sign-out-alt"></i> Cerrar sesión
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'PanelControl',
  methods: {
    navigateTo(route) {
      this.$router.push(`/${route}`);
    },
    logout() {
      localStorage.removeItem('user');
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
.panel-control {
  padding: 20px;
}

.title {
  color: #193238;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  margin-bottom: 20px;
}

.menu {
  list-style: none;
  padding: 0;
}

.menu li {
  cursor: pointer;
  color: #193238;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  margin: 10px 0;
  display: flex;
  align-items: center;
}

.menu li i {
  margin-right: 10px;
}
</style>
