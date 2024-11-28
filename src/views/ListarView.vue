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
  <div class="container mt-5 p-5">
    <div class="row">
      <div class="col">
        <h1>Usuarios registrados</h1>
        <!-- Formulario de filtro -->
        <div class="mb-4">
          <form @submit.prevent="filterByMonth">
            <div class="mb-3">
              <label for="mesFiltro" class="form-label"
                >Filtrar por mes y año:</label
              >
              <div class="d-flex">
                <select
                  id="mesFiltro"
                  v-model="mesFiltro"
                  class="form-select me-2"
                >
                  <option value="" disabled>Seleccionar mes</option>
                  <option
                    v-for="(mes, index) in meses"
                    :key="index"
                    :value="index + 1"
                  >
                    {{ mes }}
                  </option>
                </select>
                <select
                  id="anioFiltro"
                  v-model="anioFiltro"
                  class="form-select"
                >
                  <option value="" disabled>Seleccionar año</option>
                  <option v-for="anio in anios" :key="anio" :value="anio">
                    {{ anio }}
                  </option>
                </select>
              </div>
            </div>
            <button type="submit" class="btn btn-primary">Filtrar</button>
          </form>
        </div>

        <!-- Tabla -->
        <div class="table-responsive mt-4">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">UID</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">C.C</th>
                <th scope="col">Teléfono</th>
                <th scope="col">Email</th>
                <th scope="col">Puntos acumulados</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="usuario in client.usuarios" :key="usuario.uid">
                <td>{{ usuario.uid }}</td>
                <td>{{ usuario.nombre }}</td>
                <td>{{ usuario.apellido }}</td>
                <td>{{ usuario.cc }}</td>
                <td>{{ usuario.telefono }}</td>
                <td>{{ usuario.email }}</td>
                <td>{{ usuario.saldo_acumulado }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Paginación -->
        <div
          v-if="client.paginacion"
          class="d-flex justify-content-between align-items-center my-3"
        >
          <button
            class="btn btn-primary"
            @click="fetchUsers(client.paginacion.prev_page_url)"
            :disabled="!client.paginacion.prev_page_url"
          >
            Anterior
          </button>

          <span>
            Página {{ client.paginacion.current_page }} de
            {{ client.paginacion.last_page }}
          </span>

          <button
            class="btn btn-primary"
            @click="fetchUsers(client.paginacion.next_page_url)"
            :disabled="!client.paginacion.next_page_url"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- <script setup>
import { onMounted } from "vue";
import { useClientStore } from "../stores/clientStore";
import { RouterLink } from "vue-router";
import useAuthStore from "@/stores/auth";

const { logout } = useAuthStore();
const client = useClientStore();

onMounted(() => {
  client.fetchClients();
});

// Acción para obtener usuarios paginados
const fetchUsers = async (url) => {
  if (url) {
    await client.fetchClients(url);
  }
};
</script> -->

<!-- <script setup>
import { onMounted, ref } from "vue";
import { useClientStore } from "../stores/clientStore";
import { RouterLink } from "vue-router";
import useAuthStore from "@/stores/auth";

const { logout } = useAuthStore();
const client = useClientStore();
const fechaFiltro = ref(""); // Estado para la fecha seleccionada

// Al montar el componente, carga los usuarios sin filtro inicialmente
onMounted(() => {
  client.fetchClients();
});

// Función para filtrar usuarios por fecha
const filterByDate = async () => {
  const url = "/fetchUser"; // URL base
  await client.fetchClients(url, fechaFiltro.value); // Pasar la fecha como parámetro
};

// Función para manejar la paginación, respetando el filtro de fecha
const fetchUsers = async (url) => {
  if (url) {
    await client.fetchClients(url, fechaFiltro.value); // Pasar la fecha actual
  }
};
</script> -->

<script setup>
import { onMounted, ref } from "vue";
import { useClientStore } from "../stores/clientStore";

const client = useClientStore();

const mesFiltro = ref(""); // Mes seleccionado (número 1-12)
const anioFiltro = ref(""); // Año seleccionado

// Opciones de meses y años para el filtro
const meses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
const anios = Array.from(
  { length: 10 },
  (_, i) => new Date().getFullYear() - i
);

// Cargar usuarios al montar el componente
onMounted(() => {
  client.fetchClients();
});

// Filtrar usuarios por mes
const filterByMonth = async () => {
  // Validar que ambos campos estén completos
  if (mesFiltro.value && anioFiltro.value) {
    // Generar el formato "YYYY-MM" esperado por el backend
    const mesAnioFiltro = `${anioFiltro.value}-${String(
      mesFiltro.value
    ).padStart(2, "0")}`;

    // Enviar la consulta con el filtro
    await client.fetchClients({ mes: mesAnioFiltro });
  }
};
</script>

<style>
.navbar-brand,
.offcanvas-title {
  font-weight: bold;
}

.margen {
  margin-left: 10px;
}

.dropdown-toggle:hover {
  font-weight: bold;
  background-color: rgb(132, 138, 138);
  transition: 0.3s;
}

.over:hover {
  background-color: rgb(132, 138, 138);
  font-weight: bold;
  transition: 0.3s;
}
</style>
