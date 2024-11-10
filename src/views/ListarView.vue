<template>
    <div class="container mt-5 p-5">
        <div class="row">
            <div class="col">
                <h1>Usuarios registrados</h1>
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
                                <th scope="col">Saldo acumulado</th>
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
                <div v-if="client.paginacion" class="d-flex justify-content-between align-items-center my-3">
                    <button class="btn btn-primary" @click="fetchUsers(client.paginacion.prev_page_url)"
                        :disabled="!client.paginacion.prev_page_url">
                        Anterior
                    </button>

                    <span>
                        Página {{ client.paginacion.current_page }} de {{ client.paginacion.last_page }}
                    </span>

                    <button class="btn btn-primary" @click="fetchUsers(client.paginacion.next_page_url)"
                        :disabled="!client.paginacion.next_page_url">
                        Siguiente
                    </button>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useClientStore } from '../stores/clientStore';
const client = useClientStore();

onMounted(() => {
    client.fetchClients();
});

// Acción para obtener usuarios paginados
const fetchUsers = async (url) => {
    if (url) {
        await client.fetchClients(url);
    }
}
</script>
