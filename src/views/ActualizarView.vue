<template>
    <div class="container mt-5 p-5">
        <div class="row">
            <div class="col-12 col-md-6 offset-md-3">
                <h1 class="text-center mb-4">Buscar Usuario</h1>
                <!-- Input de búsqueda -->
                <div class="input-group mb-3">
                    <input type="text" class="form-control" v-model="searchQuery"
                        placeholder="Buscar por de documento" />
                    <button class="btn btn-primary" @click="searchUser">Buscar</button>
                </div>

                <!-- Mostrar mensajes de error si no se encuentra el usuario -->
                <div v-if="clientStore.messageApiUsuarioEncontrado"
                    :class="['alert', `alert-${clientStore.clase}`, 'alert-dismissible', 'fade', 'show']">
                    {{ clientStore.messageApiUsuarioEncontrado }}
                    <button type="button" class="btn-close" @click="clientStore.messageApiUsuarioEncontrado = null"
                        aria-label="Close"></button>
                </div>

                <div v-if="clientStore.messageApiUpdateUser"
                    :class="['alert', 'alert-success', 'alert-dismissible', 'fade', 'show']" role="alert">
                    {{ clientStore.messageApiUpdateUser }}
                    <button type="button" class="btn-close" @click="clientStore.messageApiUpdateUser = null"
                        aria-label="Close"></button>
                </div>
                <!-- Mostrar el formulario si el usuario es encontrado -->
                <div v-if="clientStore.clientFormUpdate.nombre" class="mt-5">
                    <h2 class="text-center mb-4">Actualizar Información del Usuario</h2>
                    <form @submit.prevent="updateUser">
                        <div class="mb-3">
                            <label for="uid" class="form-label">UID</label>
                            <input type="text" class="form-control" id="uid" v-model="clientStore.rfidReadUpdate" />
                        </div>
                        <div class="mb-3">
                            <label for="nombre" class="form-label">Nombre</label>
                            <input type="text" class="form-control" id="nombre"
                                v-model="clientStore.clientFormUpdate.nombre" required />
                        </div>
                        <div class="mb-3">
                            <label for="apellido" class="form-label">Apellido</label>
                            <input type="text" class="form-control" id="apellido"
                                v-model="clientStore.clientFormUpdate.apellido" required />
                        </div>
                        <div class="mb-3">
                            <label for="cc" class="form-label">Número de documento</label>
                            <input type="text" class="form-control" id="cc" v-model="clientStore.clientFormUpdate.cc"
                                required />
                        </div>
                        <div class="mb-3">
                            <label for="telefono" class="form-label">Teléfono</label>
                            <input type="text" class="form-control" id="telefono"
                                v-model="clientStore.clientFormUpdate.telefono" required />
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input type="email" class="form-control" id="email"
                                v-model="clientStore.clientFormUpdate.email" required />
                        </div>
                        <button type="submit" class="btn btn-success w-100">
                            Actualizar Usuario
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useClientStore } from '../stores/clientStore'; // Importar el store
import { onMounted } from 'vue';
import echo from '../assets/echo'; // Importar Echo

const clientStore = useClientStore(); // Usar el store de Pinia
const searchQuery = ref(''); // Almacenar la consulta de búsqueda

// Función para buscar un usuario por UID o número de documento
const searchUser = async () => {
    try {
        if (searchQuery.value) {
            // Llamar a la acción de búsqueda en el store
            await clientStore.searchClient(searchQuery.value);
            // Verificar si hay un mensaje de éxito en la búsqueda
            if (clientStore.messageApiUsuarioEncontrado) {
                // Si se encuentra el usuario, el formulario se llena automáticamente
                clientStore.clase = "success"
                searchQuery.value = ''; // Limpiar la consulta de búsqueda
            }
        } else {
            clientStore.messageApiUsuarioEncontrado = 'Por favor, ingrese un UID o número de documento para buscar.';
            clientStore.clase = "danger"
        }
    } catch (error) {
        console.error('Error al buscar usuario:', error);
        clientStore.clase = "warning"
        clientStore.clearFormUpdate();
    }
};

onMounted(() => {
    echo.channel('rfid-tag-read')
        .listen('RFIDTagReadEvent', (e) => {
            //searchQuery.value = e.uid; // Actualizar el valor del ref
            //searchUser();
            clientStore.rfidReadUpdate = e.uid;
        });
});
// Función para actualizar los datos del usuario
const updateUser = async () => {
    try {
        await clientStore.updateClient(); // Usar la acción de registrar en el store

    } catch (error) {
        console.error('Error al actualizar usuario:', error);
    }
};
</script>

<style scoped>
/* Estilos básicos */
.form-control {
    font-size: 0.9rem;
    padding: 0.5rem;
}

h1,
h2 {
    font-size: 1.5rem;
    text-align: center;
}
</style>
