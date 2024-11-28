<template>
  <header>
    <nav class="navbar bg-body-tertiary fixed-top">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Sistema RFID</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="offcanvas offcanvas-end"
          tabindex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">
              Sistema RFID
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li class="nav-item over mb-3">
                <RouterLink class="nav-link margen" to="/recargar"
                  >Recargar tarjeta</RouterLink
                >
              </li>
              <li class="nav-item over mb-3">
                <RouterLink class="nav-link margen" to="/puntos"
                  >Configuración</RouterLink
                >
              </li>
              <div class="dropdown">
                <button
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Opciones del usuario
                </button>
                <ul class="dropdown-menu">
                  <li class="over">
                    <RouterLink class="nav-link margen" to="/registrar"
                      >Registrar usuario
                    </RouterLink>
                  </li>
                  <li class="over">
                    <RouterLink class="nav-link margen" to="/actualizar"
                      >Actualizar usuario
                    </RouterLink>
                  </li>
                  <li class="over">
                    <RouterLink class="nav-link margen" to="/listar"
                      >Usuarios registrados
                    </RouterLink>
                  </li>
                </ul>
              </div>
              <button @click="logout" class="btn btn-success my-5">
                Cerrar sesión
              </button>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </header>

  <!-- Contenido principal -->
  <div class="container my-5 pt-5">
    <!-- Alerta de éxito -->
    <div v-if="alertVisible" class="alert alert-success" role="alert">
      Configuración guardada con éxito
    </div>

    <div class="row justify-content-center align-items-center g-2">
      <div class="col-md-6">
        <div class="card shadow">
          <div class="card-body">
            <h3 class="text-center mb-4">Configure puntos límites</h3>
            <form @submit.prevent="configPuntos">
              <!-- Campo de Puntos -->
              <div class="mb-3">
                <label for="puntos" class="form-label">Puntos</label>
                <input
                  type="text"
                  class="form-control"
                  id="puntos"
                  v-model="punto"
                  placeholder="Introduce los puntos"
                />
              </div>

              <!-- Botón de Guardar -->
              <div class="d-grid">
                <button type="submit" class="btn btn-primary">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import useAuthStore from "@/stores/auth";
import { ref } from "vue";

const { logout, puntosPost } = useAuthStore();

const punto = ref("");
const alertVisible = ref(false);

const configPuntos = async () => {
  await puntosPost(punto.value); // Llamada para guardar los puntos
  alertVisible.value = true; // Mostrar la alerta
  punto.value = ""; // Limpiar el campo
  setTimeout(() => {
    alertVisible.value = false; // Ocultar la alerta después de 3 segundos
  }, 3000);
};
</script>
