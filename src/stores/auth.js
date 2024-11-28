import { defineStore } from "pinia";
import axios from "@/assets/apiCliente";
import { ref } from "vue";
import router from "@/router";

const useAuthStore = defineStore("auth", () => {
  const register = async (data) => {
    const response = await axios.post("/registerAdmin", data);
    return response.data;
  };

  const login = async (payload) => {
    const response = await axios.post("/login", payload);
    if (response.status === 200) {
      localStorage.setItem("token", response.data.access_token);
      router.push({ name: "recargar" });
    }

    return response;
  };

  const logout = async () => {
    const response = await axios.post("/logout");
    localStorage.removeItem("token");
    router.push({ name: "login" });
  };

  const puntosPost = async (puntos) => {
    try {
      const response = await axios.post("/puntos", { puntos: puntos });
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
      // Manejar el error aquí, por ejemplo, mostrar un mensaje al usuario
    }
  };

  const puntosGet = async () => {
    const response = await axios.get("/puntos");
    return response.data[0];
  };

  return {
    login,
    logout,
    register,
    puntosPost,
    puntosGet,
  };
});

export default useAuthStore;
