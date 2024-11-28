<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div
      class="p-4 bg-light shadow rounded"
      style="width: 100%; max-width: 400px"
    >
      <!-- Alert de éxito -->
      <div
        v-if="successMessage"
        class="alert alert-success text-center"
        role="alert"
      >
        {{ successMessage }}
      </div>

      <!-- Alert de error -->
      <div
        v-if="errorMessage"
        class="alert alert-danger text-center"
        role="alert"
      >
        {{ errorMessage }}
      </div>

      <form @submit.prevent="handleSubmit">
        <h2 class="text-center mb-4">
          {{ isLogin ? "Iniciar sesión" : "Registrarse" }}
        </h2>

        <!-- Formulario de registro (solo se muestra si no es login) -->
        <div v-if="!isLogin" class="mb-3">
          <label for="name" class="form-label">Nombre</label>
          <input
            v-model="registerForm.name"
            type="text"
            id="name"
            class="form-control"
            placeholder="Introduce tu nombre"
            required
          />
        </div>

        <!-- Campo de correo -->
        <div class="mb-3">
          <label for="email" class="form-label">Correo</label>
          <input
            v-model="currentForm.email"
            type="email"
            id="email"
            class="form-control"
            placeholder="Introduce tu correo"
            required
          />
        </div>

        <!-- Campo de contraseña -->
        <div class="mb-3">
          <label for="password" class="form-label">Contraseña</label>
          <input
            v-model="currentForm.password"
            type="password"
            id="password"
            class="form-control"
            placeholder="Introduce tu contraseña"
            required
          />
        </div>

        <!-- Botón de acción -->
        <div class="d-grid">
          <button type="submit" class="btn btn-primary">
            {{ isLogin ? "Iniciar sesión" : "Registrarse" }}
          </button>
        </div>

        <!-- Alternar entre login y registro -->
        <div class="text-center mt-3">
          <p>
            {{
              isLogin ? "¿No tienes una cuenta? " : "¿Ya tienes una cuenta? "
            }}
            <a href="#" @click.prevent="toggleForm">
              {{ isLogin ? "Regístrate" : "Inicia sesión" }}
            </a>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import useAuthStore from "@/stores/auth";

// Store de autenticación
const { login, register } = useAuthStore();

// Estado para alternar entre login y registro
const isLogin = ref(true);

// Formularios separados
const loginForm = ref({
  email: "",
  password: "",
});

const registerForm = ref({
  name: "",
  email: "",
  password: "",
});

// Mensajes de éxito y error
const successMessage = ref("");
const errorMessage = ref("");

// Computed para seleccionar el formulario actual
const currentForm = computed(() =>
  isLogin.value ? loginForm.value : registerForm.value
);

// Alternar entre formularios
const toggleForm = () => {
  isLogin.value = !isLogin.value;
  successMessage.value = ""; // Oculta mensajes al cambiar de formulario
  errorMessage.value = "";
};

// Manejar el envío
const handleSubmit = async () => {
  try {
    if (isLogin.value) {
      // Lógica de inicio de sesión
      const response = await login(loginForm.value);
      console.log("Inicio de sesión exitoso:", response);

      // Limpiar formulario e iniciar sesión
      loginForm.value.email = "";
      loginForm.value.password = "";
    } else {
      // Lógica de registro
      const response = await register(registerForm.value);
      console.log("Registro exitoso:", response);

      // Mostrar mensaje de éxito
      successMessage.value = "Usuario registrado con éxito.";

      // Limpiar el formulario de registro
      registerForm.value.name = "";
      registerForm.value.email = "";
      registerForm.value.password = "";

      // Alternar a la vista de login
      setTimeout(() => {
        isLogin.value = true;
        successMessage.value = ""; // Ocultar el mensaje después de 3 segundos
      }, 3000);
    }
  } catch (error) {
    console.error("Error:", error);

    // Mostrar mensaje de error si las credenciales son incorrectas
    if (isLogin.value) {
      errorMessage.value =
        "Credenciales incorrectas. Por favor, verifica tus datos.";
    } else {
      errorMessage.value = "Error al registrarse. Intenta nuevamente.";
    }

    // Ocultar el mensaje de error después de 3 segundos
    setTimeout(() => {
      errorMessage.value = "";
    }, 3000);
  }
};
</script>
