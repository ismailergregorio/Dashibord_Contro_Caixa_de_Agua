import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081"
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");

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

      const refresh = localStorage.getItem("refreshToken");

      const { data } = await api.post("/usuario/refresh", {
        refreshToken: refresh
      });

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      originalRequest.headers.Authorization =
        `Bearer ${data.accessToken}`;

      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default api;