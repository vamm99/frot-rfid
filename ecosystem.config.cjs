module.exports = {
  apps: [
    {
      name: "vue-dev-server",
      script: "npm",
      args: "run serve",
      cwd: ".", // Ruta al proyecto, aquí es la raíz
      interpreter: "/usr/bin/node", // Ruta a Node.js, asegúrate de que coincide con tu instalación
      env: {
        NODE_ENV: "development", // Configuración de entorno
      },
    },
  ],
};
