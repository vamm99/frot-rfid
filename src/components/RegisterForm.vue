<template>
  <div class="container mt-5">
    <form
      @submit.prevent="submitForm"
      class="needs-validation"
      novalidate
      style="max-height: 80vh; overflow-y: auto; overflow-x: hidden"
    >
      <h1 class="text-center mb-4">Registrar Cliente</h1>

      <!-- Alerta de éxito -->
      <div
        v-if="client.messageApi"
        class="alert alert-success alert-dismissible fade show"
        role="alert"
      >
        {{ client.messageApi }}
        <button
          type="button"
          class="btn-close"
          @click="client.messageApi = null"
          aria-label="Close"
        ></button>
      </div>

      <div class="row">
        <!-- Primera columna -->
        <div class="col-12 col-md-6">
          <div class="mb-3">
            <label for="uid" class="form-label">
              <i class="bi bi-person-circle"></i> UID
            </label>
            <input
              type="text"
              class="form-control"
              id="uid"
              v-model="client.rfidReadRegister"
              readonly
            />
          </div>

          <div class="mb-3">
            <label for="nombre" class="form-label">
              <i class="bi bi-person-fill"></i> Nombre
            </label>
            <input
              type="text"
              class="form-control"
              id="nombre"
              v-model="client.clientForm.nombre"
              required
            />
          </div>

          <div class="mb-3">
            <label for="apellido" class="form-label">
              <i class="bi bi-person-fill"></i> Apellido
            </label>
            <input
              type="text"
              class="form-control"
              id="apellido"
              v-model="client.clientForm.apellido"
              required
            />
          </div>

          <div class="mb-3">
            <label for="cc" class="form-label">
              <i class="bi bi-file-earmark-person"></i> Identificación
            </label>
            <input
              type="text"
              class="form-control"
              id="cc"
              v-model="client.clientForm.cc"
              required
            />
          </div>
        </div>

        <!-- Segunda columna -->
        <div class="col-12 col-md-6">
          <div class="mb-3">
            <label for="telefono" class="form-label">
              <i class="bi bi-telephone-fill"></i> Teléfono
            </label>
            <input
              type="tel"
              class="form-control"
              id="telefono"
              v-model="client.clientForm.telefono"
              required
            />
          </div>

          <div class="mb-3">
            <label for="email" class="form-label">
              <i class="bi bi-envelope-fill"></i> Correo
            </label>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="client.clientForm.email"
              required
            />
          </div>

          <div class="mb-3">
            <label for="saldo" class="form-label">
              <i class="bi bi-cash-coin"></i> Puntos
            </label>
            <input
              type="number"
              class="form-control"
              id="saldo"
              v-model="client.clientForm.saldo_acumulado"
              required
            />
          </div>
        </div>
      </div>

      <!-- Botón de envío -->
      <div class="mt-3">
        <button type="submit" class="btn btn-primary btn-md">Registrar</button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>

<script setup>
import { useClientStore } from "../stores/clientStore"; // Importar el store de Pinia
import { onMounted } from "vue";
import echo from "../assets/echo"; // Importar Echo

const client = useClientStore();
onMounted(() => {
  echo.channel("rfid-tag-read").listen("RFIDTagReadEvent", (e) => {
    client.rfidReadRegister = e.uid;
  });
});

watch(
  () => client.messageApi,
  (newMessage) => {
    if (newMessage) {
      setTimeout(() => {
        client.message = null;
      }, 3000);
    }
  }
);

const submitForm = async () => {
  try {
    await client.registerClient(); // Llamamos a la acción que registra el cliente
  } catch (error) {
    console.error("Error al registrar cliente:", error);
  }
};
</script>
