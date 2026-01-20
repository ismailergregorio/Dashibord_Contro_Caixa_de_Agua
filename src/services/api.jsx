import axios from "axios";

const api = axios.create({
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
    const status = error.response?.status;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refresh = localStorage.getItem("refreshToken");

        const { data } = await api.post("/refresh", {
          refreshToken: refresh
        });

        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        originalRequest.headers.Authorization =
          `Bearer ${data.accessToken}`;

        return api(originalRequest);

      } catch (err) {
        // Falhou o refresh → logout forçado
        localStorage.clear();
        window.location.href = "/";
      }
    }

    // if (status === 403) {
    //   localStorage.clear();
    //   window.location.href = "/";
    // }

    return Promise.reject(error);
  }
);

export default api;
