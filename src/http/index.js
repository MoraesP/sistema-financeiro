import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3000/",
});

http.interceptors.request.use(
  function (config) {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      // Se o token estiver expirado ou inválido, redirecionar o usuário para a página de login
      sessionStorage.removeItem("token"); // Remover o token inválido
      window.location.href = "/"; // Redirecionar para a página de login
    }
    return Promise.reject(error);
  }
);

export default http;
