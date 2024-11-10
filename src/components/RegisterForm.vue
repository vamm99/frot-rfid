<template>
    <div class="container mt-5 p-5 ">
        <div class="row p-5">
            <div class="col-12 col-md-6 offset-md-3">
                <h1 class="text-center mb-4">Registrar Cliente</h1>
                <!-- Alerta de éxito -->
                <div v-if="client.messageApi" class="alert alert-success alert-dismissible fade show" role="alert">
                    {{ client.messageApi }}
                    <button type="button" class="btn-close" @click="client.messageApi = null"
                        aria-label="Close"></button>
                </div>

                <form @submit.prevent="submitForm" class="needs-validation" novalidate>
                    <div class="mb-3">
                        <label for="uid" class="form-label">
                            <i class="bi bi-person-circle"></i> UID
                        </label>
                        <input type="text" class="form-control" id="uid" v-model="client.rfidReadRegister" readonly />
                    </div>

                    <div class="mb-3">
                        <label for="nombre" class="form-label">
                            <i class="bi bi-person-fill"></i> Nombre
                        </label>
                        <input type="text" class="form-control" id="nombre" v-model="client.clientForm.nombre"
                            required />
                    </div>

                    <div class="mb-3">
                        <label for="apellido" class="form-label">
                            <i class="bi bi-person-fill"></i> Apellido
                        </label>
                        <input type="text" class="form-control" id="apellido" v-model="client.clientForm.apellido"
                            required />
                    </div>

                    <div class="mb-3">
                        <label for="cc" class="form-label">
                            <i class="bi bi-file-earmark-person"></i> Identificación
                        </label>
                        <input type="text" class="form-control" id="cc" v-model="client.clientForm.cc" required />
                    </div>

                    <div class="mb-3">
                        <label for="telefono" class="form-label">
                            <i class="bi bi-telephone-fill"></i> Teléfono
                        </label>
                        <input type="tel" class="form-control" id="telefono" v-model="client.clientForm.telefono"
                            required />
                    </div>

                    <div class="mb-3">
                        <label for="email" class="form-label">
                            <i class="bi bi-envelope-fill"></i> Correo
                        </label>
                        <input type="email" class="form-control" id="email" v-model="client.clientForm.email"
                            required />
                    </div>

                    <div class="mb-3">
                        <label for="saldo" class="form-label">
                            <i class="bi bi-cash-coin"></i> Saldo
                        </label>
                        <input type="number" class="form-control" id="saldo" v-model="client.clientForm.saldo_acumulado"
                            required />
                    </div>

                    <button type="submit" class="btn btn-primary w-100">Registrar</button>
                </form>
            </div>
        </div>
    </div>
</template>


<style scoped></style>

<script setup>
import { useClientStore } from '../stores/clientStore'; // Importar el store de Pinia
import { onMounted } from 'vue';
import echo from '../assets/echo'; // Importar Echo

const client = useClientStore();
onMounted(() => {
    echo.channel('rfid-tag-read')
        .listen('RFIDTagReadEvent', (e) => {
            client.rfidReadRegister = e.uid;

        });
});

const submitForm = async () => {
    try {
        await client.registerClient(); // Llamamos a la acción que registra el cliente
    } catch (error) {
        console.error('Error al registrar cliente:', error);
    }
};

</script>
