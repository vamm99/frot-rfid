import { defineStore } from 'pinia';
import axios from '../assets/apiCliente'; // Importar axios con la configuración adecuada

export const useClientStore = defineStore('client', {
    state: () => ({
        usuarios: [],
        paginacion: null,
        rfidReadRecargarSaldo: null,
        rfidReadRegister: null, // UID del cliente
        rfidReadUpdate: null,
        nombre: '', // Nombre del cliente
        apellido: '', // Apellido del cliente
        cc: '', // Documento de identidad
        telefono: '', // Teléfono del cliente
        email: '', // Correo electrónico del cliente
        saldo_acumulado: '', // Saldo acumulado
        message: "", // Mensaje cuando se lee un UID
        messageApi: "",
        messageApiRecargarSaldo: "",
        messageApiUsuarioEncontrado: "",
        messageApiUpdate: "",
        messageApiUpdateUser: "",  // Mensaje de respuesta de la API
        clase: "",
        saldoAdicional: "",
        clientForm: {  // Objeto que contiene todos los datos del formulario
            nombre: '',
            apellido: '',
            cc: '',
            telefono: '',
            email: '',
            saldo_acumulado: '',
        },
        clientFormUpdate: {  // Objeto que contiene todos los datos del formulario
            nombre: '',
            apellido: '',
            cc: '',
            telefono: '',
            email: '',
            saldo_acumulado: '',
        },
    }),

    actions: {
        // Acción para listar clientes (con paginación)
        async fetchClients(url = '/fecthUser') {
            try {
                const response = await axios.get(url);
                this.usuarios = response.data.data;
                this.paginacion = {
                    current_page: response.data.current_page,
                    last_page: response.data.last_page,
                    next_page_url: response.data.next_page_url,
                    prev_page_url: response.data.prev_page_url,
                };
            } catch (error) {
                console.error('Error al obtener clientes:', error);
            }
        },


        // Acción para recargar saldo
        async recargarSaldo() {
            try {
                // Hacer la solicitud PUT a la API para actualizar el saldo
                const response = await axios.put(`/${this.rfidReadRecargarSaldo}/saldo`, {
                    saldo_adicional: this.saldoAdicional
                });

                // Actualizar el saldo acumulado en el estado después de la recarga
                this.saldo_acumulado = response.data.saldo_acumulado;

                // Mensaje de éxito
                this.messageApiRecargarSaldo = response.data.message;
                return response.data;
            } catch (error) {
                // Manejar errores en la solicitud
                if (error.response && error.response.data) {
                    this.messageApiRecargarSaldo = 'Error al recargar saldo: ' + error.response.data.message;
                } else {
                    this.messageApiRecargarSaldo = 'Error al recargar saldo: ' + error.message;
                }
                throw error;
            }
        },


        // Acción para registrar un cliente en la base de datos
        async registerClient() {
            // Crear los datos que se enviarán a la API
            const formData = {
                uid: this.rfidReadRegister,
                ...this.clientForm  // Usamos destructuración para incluir todos los datos del formulario
            };
            try {
                // Hacer la solicitud POST a la API para registrar al cliente
                const response = await axios.post('/register', formData);
                this.messageApi = response.data.message;
                this.clearForm(); // Limpiar el formulario después de registrar
                return response.data;
            } catch (error) {
                // Manejar errores en la solicitud
                if (error.response && error.response.data) {
                    this.messageApi = 'Error al registrar cliente: ' + error.response.data.message;
                } else {
                    this.messageApi = 'Error al registrar cliente: ' + error.message;
                }
                throw error;
            }
        },

        // Acción para Actualizar un cliente en la base de datos
        async updateClient() {
            // Crear los datos que se enviarán a la API
            const clientFormUpdate = {
                uid: this.rfidReadUpdate,
                ...this.clientFormUpdate  // Usamos destructuración para incluir todos los datos del formulario
            };
            try {
                // Hacer la solicitud POST a la API para registrar al cliente
                const response = await axios.put(`/update/${this.clientFormUpdate.cc}`, clientFormUpdate);
                this.messageApiUpdateUser = response.data.message;
                this.clearFormUpdate(); // Limpiar el formulario después de registrar
                return response.data;
            } catch (error) {
                // Manejar errores en la solicitud
                if (error.response && error.response.data) {
                    this.messageApiUpdateUser = 'Error al registrar cliente: ' + error.response.data.message;
                } else {
                    this.messageApiUpdateUser = 'Error al registrar cliente: ' + error.message;
                }
                throw error;
            }
        },

        // Acción para buscar por UID o CC
        async searchClient(query) {
            try {
                const response = await axios.get('/users/search', { params: { query } });

                const user = response.data;

                // Si se encuentra el usuario, actualizar los campos del formulario
                this.clientFormUpdate = {
                    nombre: user.nombre,
                    apellido: user.apellido,
                    cc: user.cc,
                    telefono: user.telefono,
                    email: user.email,
                    saldo_acumulado: user.saldo_acumulado,
                };

                this.rfidReadUpdate = user.uid; // Asignar el UID leído

                // Mostrar mensaje de éxito
                this.messageApiUsuarioEncontrado = "Cliente encontrado correctamente.";
                return user;

            } catch (error) {
                // Manejar el error si el cliente no es encontrado
                if (error.response && error.response.data) {
                    this.messageApiUsuarioEncontrado = 'Error: ' + error.response.data.message;
                } else {
                    this.messageApiUsuarioEncontrado = 'Error: ' + error.message;
                }
                throw error;
            }
        },

        // Acción para actualizar el UID y los datos del usuario cuando se lee el RFID
        updateUID(uid, nombre, apellido, cc, telefono, email, saldo_acumulado, message, clase) {
            this.rfidReadRecargarSaldo = uid; // Guardar el UID en el estado
            this.nombre = nombre; // Guardar la información del usuario en el estado
            this.apellido = apellido;
            this.cc = cc;
            this.telefono = telefono;
            this.email = email;
            this.saldo_acumulado = saldo_acumulado;
            this.message = message; // Guardar el mensaje recibido, si es necesario
            this.clase = clase;
        },

        // Acción para limpiar el formulario después de registrar un cliente
        clearForm() {
            this.rfidReadRegister = ''; // Limpiar UID
            this.clientForm = {  // Limpiar los campos del formulario
                nombre: '',
                apellido: '',
                cc: '',
                telefono: '',
                email: '',
                saldo_acumulado: '',
            };
        }, // Acción para limpiar el formulario después de registrar un cliente
        clearFormUpdate() {
            this.rfidReadUpdate = ''; // Limpiar UID
            this.clientFormUpdate = {  // Limpiar los campos del formulario
                nombre: '',
                apellido: '',
                cc: '',
                telefono: '',
                email: '',
                saldo_acumulado: '',
            };
        }

    }
});
