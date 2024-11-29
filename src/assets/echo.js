import Echo from "laravel-echo";
import Pusher from "pusher-js";
import axios from "./apiCliente"; // Importamos nuestro cliente Axios

window.Pusher = Pusher;
// Configuración de Pusher y Echo
const echo = new Echo({
  broadcaster: "pusher",
  key: "9ri8262cyqzlgdy3jny5",
  wsHost: "apiapp.mooo.com",
  wsPort: 8080, // Cambiar si el puerto 8080 no está permitido en producción
  wssPort: 443, // Puerto estándar para WebSockets seguros
  forceTLS: true,
  encrypted: true,
  disableStats: true,
  authorizer: (channel, options) => {
    return {
      authorize: (socketId, callback) => {
        // Autenticamos usando Axios para canales privados o presencia
        axios
          .post("/broadcasting/auth", {
            socket_id: socketId,
            channel_name: channel.name,
          })
          .then((response) => {
            callback(false, response.data); // Si la autenticación es exitosa
          })
          .catch((error) => {
            callback(true, error); // Si hay un error en la autenticación
          });
      },
    };
  },
});

// Exportamos la instancia de Echo para usarla en otros componentes
export default echo;
// import Echo from "laravel-echo";
// import Pusher from "pusher-js";
// import axios from "./apiCliente"; // Importamos nuestro cliente Axios

// window.Pusher = Pusher;
// // Configuración de Pusher y Echo
// const echo = new Echo({
//   broadcaster: "reverb",
//   key: "9ri8262cyqzlgdy3jny5", // Tu clave de Pusher (puedes obtenerla de tu cuenta de Pusher)
//   wsHost: "apiapp.mooo.com",
//   wsPort: 8080,
//   forceTLS: false,
//   encrypted: true,
//   disableStats: true,
//   authorizer: (channel, options) => {
//     return {
//       authorize: (socketId, callback) => {
//         // Autenticamos usando Axios para canales privados o presencia
//         axios
//           .post("/broadcasting/auth", {
//             socket_id: socketId,
//             channel_name: channel.name,
//           })
//           .then((response) => {
//             callback(false, response.data); // Si la autenticación es exitosa
//           })
//           .catch((error) => {
//             callback(true, error); // Si hay un error en la autenticación
//           });
//       },
//     };
//   },
// });

// // Exportamos la instancia de Echo para usarla en otros componentes
// export default echo;
