<template>
    <div class="container mt-5 p-5 ">
        <div class="row p-5 my-5 ">
            <div class="col-12 col-md-5 my-5">
                <h1 class="text-center mb-4">Recargar saldo</h1>

                <!-- Alerta de éxito al leer el UID -->
                <div v-if="client.message && !client.messageApiRecargarSaldo"
                    :class="['alert', `alert-${client.clase}`, 'alert-dismissible', 'fade', 'show']" role="alert">
                    {{ client.message }}
                    <button type="button" class="btn-close" @click="client.message = null" aria-label="Close"></button>
                </div>

                <!-- Alerta de éxito al recargar saldo -->
                <div v-if="client.messageApiRecargarSaldo"
                    :class="['alert', 'alert-success', 'alert-dismissible', 'fade', 'show']" role="alert">
                    {{ client.messageApiRecargarSaldo }}
                    <button type="button" class="btn-close" @click="client.messageApiRecargarSaldo = null"
                        aria-label="Close"></button>
                </div>
                <form @submit.prevent="submitForm" class="needs-validation" novalidate>
                    <div class="mb-3">
                        <label for="uid" class="form-label">
                            <i class="bi bi-person-circle"></i> UID
                        </label>
                        <input type="text" class="form-control" id="uid" v-model="client.rfidReadRecargarSaldo"
                            readonly />
                    </div>

                    <div class="mb-3">
                        <label for="saldo" class="form-label">
                            <i class="bi bi-cash-coin"></i> Saldo adicional
                        </label>
                        <input type="number" class="form-control" id="saldo" v-model="client.saldoAdicional" required />
                    </div>

                    <button type="submit" class="btn btn-primary w-100">Recargar</button>
                </form>
            </div>
            <div class="col-12 col-md-7 my-5 ">
                <!-- Tarjeta neumórfica con nuevo diseño -->
                <div class="neumorphic-card mt-4">
                    <div class="card-content">
                        <h5 class="card-title">Tarjeta digital RFID</h5>
                        <p>UID: {{ client.rfidReadRecargarSaldo }}</p>
                        <p>Nombres: {{ client.nombre }}</p>
                        <p>Apellidos: {{ client.apellido }}</p>
                        <p>Saldo: {{ client.saldo_acumulado }}</p>
                    </div>
                    <div>
                        <img class="img" src="/public/antena.png" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.form-control {
    font-size: 0.9rem;
    padding: 0.5rem;
}

h1 {
    font-size: 1.5rem;
}

.img {
    padding: 55px;
}

/* Estilo neumórfico adaptado a la tarjeta bancaria */
.neumorphic-card {
    width: 450px;
    height: 250px;
    background-color: #f0f0f0;
    border-radius: 16px;
    box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.15),
        -4px -4px 15px rgba(255, 255, 255, 0.7);
    padding: 20px;
    display: flex;
    color: #333;
    background-image: radial-gradient(circle at top left, #e0e0e0, #f8f8f8);
    align-items: center;
    justify-content: space-between;
}

.neumorphic-card .card-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
}

.neumorphic-card .card-title {
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
}

.neumorphic-card p {
    margin: 0;
    font-size: 0.95rem;
}
</style>

<script setup>
import { ref, onMounted } from 'vue';
import { useClientStore } from '../stores/clientStore'; // Importar el store de Pinia
import echo from '../assets/echo'; // Importar Echo

const client = useClientStore(); // Usar el store de Pinia

onMounted(() => {
    echo.channel('rfid-tag-read')
        .listen('RFIDTagReadEvent', (e) => {
            if (e.userData) {
                client.updateUID(e.uid, e.userData.nombre, e.userData.apellido, e.userData.cc, e.userData.telefono, e.userData.email, e.userData.saldo_acumulado, e.message, "success"); // Actualizar el UID en el store
            } else {
                client.updateUID(e.uid, "", "", "", "", "", "", e.message, "danger");
            }
        });
});

const submitForm = async () => {
    try {
        await client.recargarSaldo(); // Llamamos a la acción que recarga el saldo
    } catch (error) {
        console.error('Error al recargar saldo:', error);
    }
};
</script>
