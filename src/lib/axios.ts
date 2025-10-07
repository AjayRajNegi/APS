import axios from "axios";
import { useLoaderStore } from "@/store/loader";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Loader rules (omit specific calls)
const omitCalls = ["api/Common/getDropdownList5?option1=AllAirport"];

// Request interceptors
instance.interceptors.request.use(
  (config) => {
    config.headers["X-API-Key"] = process.env.NEXT_PUBLIC_API_KEY || "";

    const { show } = useLoaderStore.getState();
    const skipLoader = omitCalls.some((url) => config.url?.includes(url));
    if (!skipLoader) show();

    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor
instance.interceptors.response.use(
  (response) => {
    const { hide } = useLoaderStore.getState();
    hide();
    return response;
  },
  (error) => {
    const { hide } = useLoaderStore.getState();
    hide();
    return Promise.reject(error);
  },
);

export default instance;
