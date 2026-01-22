import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.100.5:8081"
});

export default api;

const refreshApi = axios.create({
  baseURL: "http://192.168.100.5:8081"
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // try {
        const refresh = localStorage.getItem("refreshToken");

        const resposta = await refreshApi.post("/auth/refresh", {
          refresh:refresh
        });

        const { toker, refreshToker } = resposta.data;

        localStorage.setItem("accessToken", toker);
        localStorage.setItem("refreshToken", refreshToker);

        console.log("novo"+toker)
        console.log("novo"+refreshToker)
        originalRequest.headers.Authorization = `Bearer ${toker}`;

        return api(originalRequest);

      // } catch (err) {
      //   console.error("Erro no refresh", err);
      //   localStorage.clear();
      //   window.location.href = "/";
      //   return Promise.reject(err);
      // }
    }

    return Promise.reject(error);
  }
);
